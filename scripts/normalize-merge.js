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

// REGION_MAP — канонические регионы
const REGION_MAP = {
  // moskva-i-mo
  'Москва': 'moskva-i-mo',
  'Московская область': 'moskva-i-mo',
  'МО': 'moskva-i-mo',
  'Москва и МО': 'moskva-i-mo',
  'Moscow': 'moskva-i-mo',
  'Moscow Region': 'moskva-i-mo',
  
  // spb-lo
  'Санкт-Петербург': 'spb-lo',
  'СПб': 'spb-lo',
  'Питер': 'spb-lo',
  'Ленобласть': 'spb-lo',
  'Ленинградская область': 'spb-lo',
  'СПб и ЛО': 'spb-lo',
  'Saint Petersburg': 'spb-lo',
  'Leningrad Oblast': 'spb-lo',
  
  // Other regions (ready for future)
  'Новосибирская область': 'novosibirskaya-oblast',
  'Свердловская область': 'sverdlovskaya-oblast',
  'Татарстан': 'tatarstan',
  'Нижегородская область': 'nizhegorodskaya-oblast',
  'Красноярский край': 'krasnoyarskiy-kray',
  'Челябинская область': 'chelyabinskaya-oblast',
  'Самарская область': 'samarskaya-oblast',
  'Башкортостан': 'bashkortostan',
  'Ростовская область': 'rostovskaya-oblast',
  'Краснодарский край': 'krasnodarskiy-kray',
  'Омская область': 'omskaya-oblast',
  'Воронежская область': 'voronezhskaya-oblast',
  'Пермский край': 'permskiy-kray',
  'Волгоградская область': 'volgogradskaya-oblast',
};

function normalizeRegion(rawRegion) {
  if (!rawRegion) return null;
  return REGION_MAP[rawRegion] || null;
}

/**
 * В будущем: порог для создания city-страницы
 * City-страница создаётся только если поставщиков >= MIN_SUPPLIERS_FOR_CITY_PAGE
 */
const MIN_SUPPLIERS_FOR_CITY_PAGE = 15;

function getRegionName(slug) {
  const names = {
    'moskva-i-mo': 'Москва и Московская область',
    'spb-lo': 'Санкт-Петербург и Ленинградская область',
    'novosibirskaya-oblast': 'Новосибирская область',
    'sverdlovskaya-oblast': 'Свердловская область',
    'tatarstan': 'Татарстан',
    'nizhegorodskaya-oblast': 'Нижегородская область',
    'krasnoyarskiy-kray': 'Красноярский край',
    'chelyabinskaya-oblast': 'Челябинская область',
    'samarskaya-oblast': 'Самарская область',
    'bashkortostan': 'Башкортостан',
    'rostovskaya-oblast': 'Ростовская область',
    'krasnodarskiy-kray': 'Краснодарский край',
    'omskaya-oblast': 'Омская область',
    'voronezhskaya-oblast': 'Воронежская область',
    'permskiy-kray': 'Пермский край',
    'volgogradskaya-oblast': 'Волгоградская область',
  };
  return names[slug] || slug;
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
    // Normalize region using REGION_MAP
    const normalizedRegion = normalizeRegion(c.city?.region);
    
    merged.push({
      id: c.id,
      slug: c.slug,
      name: c.name,
      root_domain: rootDomain.startsWith('_no_domain_') ? null : rootDomain,
      website: c.website,
      branches: getSubdomain(c.website) ? [getSubdomain(c.website)] : [],
      phones: c.phone ? [c.phone] : [],
      emails: c.email ? [c.email] : [],
      // Cities as objects (ready for future slugification)
      cities: c.city ? [{ name: c.city.name, slug: null }] : [],
      // Regions as objects with canonical slugs
      regions: normalizedRegion ? [{ slug: normalizedRegion, name: getRegionName(normalizedRegion) }] : [],
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
    
    // Normalize regions using REGION_MAP
    const normalizedRegions = [...new Set(companies.map(c => c.city?.region).filter(Boolean))]
      .map(r => normalizeRegion(r))
      .filter(Boolean); // Remove nulls
    
    merged.push({
      id: main.id,
      slug: main.slug.replace(/-спб$/, '').replace(/-msk$/, ''),
      name: main.name,
      root_domain: rootDomain,
      website: main.website,
      branches: branches,
      phones: phones,
      emails: emails,
      // Cities as objects (ready for future slugification)
      cities: cities.map(name => ({ name, slug: null })),
      // Regions as objects with canonical slugs
      regions: normalizedRegions.map(slug => ({ slug, name: getRegionName(slug) })),
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

${[...new Set(merged.flatMap(c => c.regions.map(r => r.slug)))].sort().map(r => `- ${r}`).join('\n')}

## Cities with >= 15 Suppliers (Future City Pages)

**Note:** City pages will only be created if a city has >= ${MIN_SUPPLIERS_FOR_CITY_PAGE} suppliers.

| City | Region | Suppliers | Ready for Page? |
|------|--------|-----------|-----------------|
${(() => {
  const cityCounts = {};
  merged.forEach(s => {
    s.cities.forEach(c => {
      const key = c.name;
      if (!cityCounts[key]) {
        cityCounts[key] = { count: 0, region: s.regions[0]?.name || 'Unknown' };
      }
      cityCounts[key].count++;
    });
  });
  return Object.entries(cityCounts)
    .filter(([_, data]) => data.count >= MIN_SUPPLIERS_FOR_CITY_PAGE)
    .sort((a, b) => b[1].count - a[1].count)
    .map(([city, data]) => `| ${city} | ${data.region} | ${data.count} | ${data.count >= MIN_SUPPLIERS_FOR_CITY_PAGE ? '✅ YES' : '❌ NO'} |`)
    .join('\n');
})()}

## All Cities (Top 30)

| City | Suppliers |
|------|-----------|
${(() => {
  const cityCounts = {};
  merged.forEach(s => {
    s.cities.forEach(c => {
      cityCounts[c.name] = (cityCounts[c.name] || 0) + 1;
    });
  });
  return Object.entries(cityCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30)
    .map(([city, count]) => `| ${city} | ${count} |`)
    .join('\n');
})()}

---
**Architecture Note:** Cities are stored as objects \`{ name, slug }\` to allow future slugification.
City pages (\`/[category]/[region]/[city]\`) will be generated only for cities with >= ${MIN_SUPPLIERS_FOR_CITY_PAGE} suppliers.
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
