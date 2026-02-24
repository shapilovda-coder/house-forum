#!/usr/bin/env node
/**
 * Normalize and merge companies from export_raw.json
 * - Extract root_domain from website
 * - Group subdomains (msk.x.ru, spb.x.ru → x.ru)
 * - Merge phones, emails, cities, categories
 * - Generate suppliers_clean.json + merge_report.md
 */

const fs = require('fs');
const path = require('path');

// Read export_raw.json
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/export_raw.json'), 'utf8'));

console.log(`Processing ${rawData.length} companies...`);

// Helper: extract root domain
function getRootDomain(website) {
  if (!website) return null;
  const domain = website.replace(/^https?:\/\//, '').replace(/^www\./, '');
  const parts = domain.split('.');
  if (parts.length > 2) {
    // subdomain.domain.ru → domain.ru
    return parts.slice(-2).join('.');
  }
  return domain;
}

// Helper: slugify region name
function slugifyRegion(name) {
  const map = {
    'Московская область': 'moskva-i-mo',
    'Северо-Западный': 'sankt-peterburg',
    'Приволжский': 'povolzhe',
    'Сибирский': 'sibir',
    'Уральский': 'ural',
    'Центральный': 'centr',
    'Южный': 'yug'
  };
  return map[name] || name.toLowerCase()
    .replace(/[^a-zа-я0-9]+/gi, '-')
    .replace(/^-|-$/g, '');
}
function getSubdomain(website) {
  if (!website) return null;
  const domain = website.replace(/^https?:\/\//, '');
  const parts = domain.split('.');
  if (parts.length > 2) {
    return parts[0]; // msk, spb, www, etc.
  }
  return null;
}

// Group by root_domain
const groups = {};
rawData.forEach(company => {
  const rootDomain = getRootDomain(company.website);
  if (!rootDomain) {
    // Companies without website - keep as-is
    groups[`_no_domain_${company.id}`] = [company];
    return;
  }
  
  if (!groups[rootDomain]) {
    groups[rootDomain] = [];
  }
  groups[rootDomain].push(company);
});

// Merge groups
const merged = [];
const mergeReport = {
  totalRaw: rawData.length,
  totalMerged: 0,
  mergedGroups: [],
  singleCompanies: [],
  conflicts: []
};

Object.entries(groups).forEach(([rootDomain, companies]) => {
  if (companies.length === 1) {
    // Single company - no merge needed
    const c = companies[0];
    // Normalize region
    const rawRegion = c.city?.region;
    const normalizedRegion = rawRegion === 'Московская область' ? 'moskva-i-mo' : 
                              rawRegion ? slugifyRegion(rawRegion) : null;
    
    merged.push({
      id: c.id,
      slug: c.slug,
      name: c.name,
      root_domain: rootDomain.startsWith('_no_domain_') ? null : rootDomain,
      website: c.website,
      branches: getSubdomain(c.website) ? [getSubdomain(c.website)] : [],
      phones: c.phone ? [c.phone] : [],
      emails: c.email ? [c.email] : [],
      cities: c.city ? [c.city.name] : [],
      regions: normalizedRegion ? [normalizedRegion] : [],
      categories: c.categories?.map(cc => cc.category?.slug).filter(Boolean) || [],
      address: c.address,
      is_verified: c.is_verified,
      clicks: c.clicks || 0,
      status: c.status
    });
    mergeReport.singleCompanies.push({ slug: c.slug, domain: rootDomain });
  } else {
    // Multiple companies - merge
    const main = companies.find(c => !getSubdomain(c.website)) || companies[0];
    const branches = companies.map(c => getSubdomain(c.website)).filter(Boolean);
    
    // Merge unique values
    const phones = [...new Set(companies.map(c => c.phone).filter(Boolean))];
    const emails = [...new Set(companies.map(c => c.email).filter(Boolean))];
    const cities = [...new Set(companies.map(c => c.city?.name).filter(Boolean))];
    const regions = [...new Set(companies.map(c => c.city?.region).filter(Boolean))];
    const categories = [...new Set(companies.flatMap(c => 
      c.categories?.map(cc => cc.category?.slug).filter(Boolean) || []
    ))];
    
    // Normalize regions: Москва + Московская область → moskva-i-mo
    const normalizedRegions = [...new Set(companies.map(c => c.city?.region).filter(Boolean))]
      .map(r => r === 'Московская область' ? 'moskva-i-mo' : slugifyRegion(r));
    
    merged.push({
      id: main.id,
      slug: main.slug.replace(/-спб$/, '').replace(/-msk$/, ''),
      name: main.name,
      root_domain: rootDomain,
      website: main.website,
      branches: branches,
      phones: phones,
      emails: emails,
      cities: cities,
      regions: normalizedRegions,
      categories: categories,
      address: main.address,
      is_verified: companies.some(c => c.is_verified),
      clicks: companies.reduce((sum, c) => sum + (c.clicks || 0), 0),
      status: 'active'
    });
    
    mergeReport.mergedGroups.push({
      root_domain: rootDomain,
      count: companies.length,
      branches: branches,
      cities: cities,
      slugs: companies.map(c => c.slug)
    });
  }
});

mergeReport.totalMerged = merged.length;

// Sort: StekloRoll, Artalico first, then by clicks
merged.sort((a, b) => {
  if (a.slug?.includes('stekloroll')) return -1;
  if (b.slug?.includes('stekloroll')) return 1;
  if (a.slug?.includes('artalico')) return -1;
  if (b.slug?.includes('artalico')) return 1;
  return (b.clicks || 0) - (a.clicks || 0);
});

// Save suppliers_clean.json
fs.writeFileSync(
  path.join(__dirname, '../data/suppliers_clean.json'),
  JSON.stringify(merged, null, 2)
);

// Generate merge_report.md
const reportMd = `# Merge Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Value |
|--------|-------|
| Raw companies | ${mergeReport.totalRaw} |
| Merged companies | ${mergeReport.totalMerged} |
| Merge ratio | ${((mergeReport.totalMerged / mergeReport.totalRaw) * 100).toFixed(1)}% |

## Merged Groups (${mergeReport.mergedGroups.length})

| Root Domain | Branches | Cities | Count |
|-------------|----------|--------|-------|
${mergeReport.mergedGroups.map(g => `| ${g.root_domain} | ${g.branches.join(', ')} | ${g.cities.join(', ')} | ${g.count} |`).join('\n')}

## Top Merged

${mergeReport.mergedGroups.slice(0, 10).map(g => `
### ${g.root_domain}
- Branches: ${g.branches.join(', ')}
- Cities: ${g.cities.join(', ')}
- Slugs: ${g.slugs.join(', ')}
`).join('')}

## Categories Available

${[...new Set(merged.flatMap(c => c.categories))].sort().map(c => `- ${c}`).join('\n')}

## Regions Available

${[...new Set(merged.flatMap(c => c.regions))].sort().map(r => `- ${r}`).join('\n')}
`;

fs.writeFileSync(
  path.join(__dirname, '../data/merge_report.md'),
  reportMd
);

console.log(`✅ Done!`);
console.log(`   Raw: ${mergeReport.totalRaw}`);
console.log(`   Merged: ${mergeReport.totalMerged}`);
console.log(`   Groups merged: ${mergeReport.mergedGroups.length}`);
console.log(`   Singles: ${mergeReport.singleCompanies.length}`);
