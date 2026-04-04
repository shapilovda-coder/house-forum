const fs = require('fs');
const path = require('path');

const WHITELIST_DIR = path.join(__dirname, 'data', 'published', 'whitelists');
const OUTPUT_DIR = path.join(__dirname, 'export');

if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

function normalizeDomain(input) {
  if (!input) return '';
  let domain = input.toLowerCase().trim();
  domain = domain.replace(/^https?:\/\//, '');
  domain = domain.split('/')[0].split('?')[0].split('#')[0];
  domain = domain.replace(/^www\./, '');
  return domain;
}

function decodePunycode(domain) {
  if (!domain) return domain;
  try {
    return domain.replace(/xn--[a-z0-9-]+/gi, (m) => require('punycode').toUnicode(m));
  } catch { return domain; }
}

function loadWhitelists() {
  const files = fs.readdirSync(WHITELIST_DIR).filter(f => f.endsWith('.json') && !f.includes('_urls'));
  const allSuppliers = [];
  
  for (const file of files) {
    const match = file.match(/^(.+)_(.+)\.json$/);
    if (!match) continue;
    const [, category, region] = match;
    const suppliers = JSON.parse(fs.readFileSync(path.join(WHITELIST_DIR, file), 'utf8'));
    
    for (const s of suppliers) {
      const domainRaw = s.domain || s.display_domain || s.url || '';
      const domainNorm = normalizeDomain(domainRaw);
      allSuppliers.push({
        category, region,
        supplier_id: s.id || s.slug || s.domain || '',
        domain_raw: domainRaw,
        domain_norm: domainNorm,
        display_domain: s.display_domain || decodePunycode(domainNorm),
        name: s.company_name || s.name || '',
        url: s.url || s.source_url || '',
        phones: (s.phones || []).join(', '),
        address: s.address || '',
        parse_status: s.parse_status || 'unknown',
        is_pinned: s.is_pinned ? 'true' : 'false',
        priority: s.priority || 0,
        source_file: file,
      });
    }
  }
  return allSuppliers;
}

function escapeCsv(val) {
  val = String(val || '');
  if (val.includes(',') || val.includes('"') || val.includes('\n')) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function generateSuppliersMaster(suppliers) {
  const headers = ['category', 'region', 'supplier_id', 'domain_raw', 'domain_norm', 'display_domain', 'name', 'url', 'phones', 'address', 'parse_status', 'is_pinned', 'priority', 'source_file'];
  return [headers.join(','), ...suppliers.map(s => headers.map(h => escapeCsv(s[h])).join(','))].join('\n');
}

function generateCompletenessReport(suppliers) {
  const byKey = {};
  for (const s of suppliers) {
    const key = `${s.category}|${s.region}`;
    if (!byKey[key]) byKey[key] = { category: s.category, region: s.region, total: 0, withPhone: 0, withAddress: 0, withName: 0, badParse: 0, pinnedSteklo: false, pinnedArtalico: false, domains: new Set(), duplicates: 0 };
    const r = byKey[key];
    r.total++;
    if (s.phones?.trim()) r.withPhone++;
    if (s.address?.trim()) r.withAddress++;
    if (s.name?.trim()) r.withName++;
    if (s.parse_status === 'bad' || s.parse_status === 'failed') r.badParse++;
    if (s.is_pinned === 'true' && s.domain_norm === 'stekloroll.ru') r.pinnedSteklo = true;
    if (s.is_pinned === 'true' && s.domain_norm === 'artalico.ru') r.pinnedArtalico = true;
    if (r.domains.has(s.domain_norm)) r.duplicates++; else r.domains.add(s.domain_norm);
  }
  
  const headers = ['category', 'region', 'total_suppliers', 'with_phone_count', 'with_phone_pct', 'with_address_count', 'with_address_pct', 'with_name_count', 'with_name_pct', 'bad_parse_count', 'pinned_stekloroll', 'pinned_artalico', 'duplicates', 'notes'];
  return [headers.join(','), ...Object.values(byKey).map(r => {
    const notes = [];
    if (!r.pinnedSteklo) notes.push('NO_STEKLO_PIN');
    if (r.duplicates) notes.push(`DUPLICATES:${r.duplicates}`);
    if (r.badParse) notes.push(`BAD_PARSE:${r.badParse}`);
    return [r.category, r.region, r.total, r.withPhone, `${Math.round(r.withPhone/r.total*100)}%`, r.withAddress, `${Math.round(r.withAddress/r.total*100)}%`, r.withName, `${Math.round(r.withName/r.total*100)}%`, r.badParse, r.pinnedSteklo?'YES':'NO', r.pinnedArtalico?'YES':'NO', r.duplicates, notes.join('; ')].map(escapeCsv).join(',');
  })].join('\n');
}

function generateIssuesList(suppliers) {
  const issues = [];
  const seen = new Map();
  const garbage = [/в других регионах/i, /соц\.?сет/i, /address\.png/i, /бла-бла/i];
  
  for (const s of suppliers) {
    const key = `${s.category}|${s.region}|${s.domain_norm}`;
    if (seen.has(key)) issues.push({category: s.category, region: s.region, supplier: s.domain_norm, issue_type: 'DUPLICATE', details: `First: ${seen.get(key)}`});
    else seen.set(key, s.domain_norm);
    
    if (!s.phones?.trim()) issues.push({category: s.category, region: s.region, supplier: s.domain_norm, issue_type: 'NO_PHONE', details: ''});
    if (!s.name?.trim()) issues.push({category: s.category, region: s.region, supplier: s.domain_norm, issue_type: 'NO_NAME', details: ''});
    if (!s.address?.trim()) issues.push({category: s.category, region: s.region, supplier: s.domain_norm, issue_type: 'NO_ADDRESS', details: ''});
    else {
      for (const p of garbage) if (p.test(s.address)) issues.push({category: s.category, region: s.region, supplier: s.domain_norm, issue_type: 'GARBAGE_ADDRESS', details: s.address.substring(0, 50)});
    }
  }
  
  const headers = ['category', 'region', 'supplier', 'issue_type', 'details'];
  return [headers.join(','), ...issues.map(i => [i.category, i.region, i.supplier, i.issue_type, i.details].map(escapeCsv).join(','))].join('\n');
}

function generatePinnedRules() {
  const rules = [
    {category: 'prozrachnye-rolstavni', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru, artalico.ru', notes: 'Both pinned'},
    {category: 'bezramnoe-osteklenie', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru, artalico.ru', notes: 'Both pinned'},
    {category: 'myagkie-okna', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru, artalico.ru', notes: 'Both pinned (advertisement)'},
    {category: 'zashitnye-rolstavni', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru', notes: 'StekloRoll only'},
    {category: 'rolletnye-shkafy', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru', notes: 'StekloRoll only'},
    {category: 'vorota', region: 'moskva-i-mo', pinned_order: 'stekloroll.ru', notes: 'StekloRoll only'},
  ];
  const headers = ['category', 'region', 'pinned_order', 'notes'];
  return [headers.join(','), ...rules.map(r => [r.category, r.region, r.pinned_order, r.notes].map(escapeCsv).join(','))].join('\n');
}

// Main
const suppliers = loadWhitelists();
console.log(`Loaded ${suppliers.length} suppliers from whitelists`);

fs.writeFileSync(path.join(OUTPUT_DIR, '01_suppliers_master.csv'), generateSuppliersMaster(suppliers));
console.log('Generated: 01_suppliers_master.csv');

fs.writeFileSync(path.join(OUTPUT_DIR, '02_completeness_report.csv'), generateCompletenessReport(suppliers));
console.log('Generated: 02_completeness_report.csv');

fs.writeFileSync(path.join(OUTPUT_DIR, '03_issues_list.csv'), generateIssuesList(suppliers));
console.log('Generated: 03_issues_list.csv');

fs.writeFileSync(path.join(OUTPUT_DIR, '04_pinned_rules.csv'), generatePinnedRules());
console.log('Generated: 04_pinned_rules.csv');

console.log('\n=== Summary ===');
console.log(`Total suppliers: ${suppliers.length}`);
console.log(`Categories: ${[...new Set(suppliers.map(s => s.category))].join(', ')}`);
console.log(`Output: ${OUTPUT_DIR}/`);
