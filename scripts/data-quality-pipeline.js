#!/usr/bin/env node
/**
 * Data Quality Pipeline
 * 1. Blacklist filter
 * 2. Relevance scoring via web crawling
 * 3. Contacts recovery
 * 4. Punycode normalization
 */

const fs = require('fs');
const path = require('path');

// Blacklist domains/patterns
const BLACKLIST = [
  /yandex\./i,
  /dzen\.ru/i,
  /zen\.yandex/i,
  /lemana\.pro/i,
  /leroymerlin\./i,
  /market\.yandex/i,
  /avito\.ru/i,
  /cian\.ru/i,
  /pinterest/i,
  /youtube/i,
  /facebook/i,
  /instagram/i,
  /wildberries/i,
  /ozon\.ru/i,
  /aliexpress/i,
];

// Keywords for relevance scoring
const POSITIVE_KEYWORDS = [
  'рольставни', 'рольставень', 'роллеты', 'роллета',
  'ворота', 'воротные',
  'остекление', 'остеклить', 'остеклён',
  'мягкие окна', 'мягкоокон',
  'безрамное', 'безрамного',
  'монтаж', 'установка', 'замер', 'замеры',
  'производство', 'производитель', 'изготовление',
  'поставщик', 'продажа', 'установщик'
];

const NEGATIVE_KEYWORDS = [
  'маркетплейс', 'медиа', 'новости', 'блог', 'дзен',
  'поиск', 'поисковая', 'система', 'портал', 'каталог',
  'объявления', 'отзывы', 'рейтинг', 'справочник'
];

// Load data
const rawData = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/export_raw.json'), 'utf8'));

console.log(`Processing ${rawData.length} suppliers...`);

const cleanSuppliers = [];
const rejectedSuppliers = [];
const needsManual = [];

// Stats
const stats = {
  total: rawData.length,
  blacklisted: 0,
  lowRelevance: 0,
  missingPhone: 0,
  kept: 0
};

rawData.forEach(supplier => {
  const domain = supplier.website?.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || '';
  
  // Step 1: Blacklist check
  const isBlacklisted = BLACKLIST.some(pattern => pattern.test(domain));
  if (isBlacklisted) {
    rejectedSuppliers.push({
      id: supplier.id,
      slug: supplier.slug,
      domain: domain,
      reason: 'blacklist',
      name: supplier.name
    });
    stats.blacklisted++;
    return;
  }
  
  // Step 2: Basic relevance check (by name/description if available)
  const textToCheck = `${supplier.name || ''} ${supplier.description || ''}`.toLowerCase();
  
  const positiveMatches = POSITIVE_KEYWORDS.filter(kw => textToCheck.includes(kw)).length;
  const negativeMatches = NEGATIVE_KEYWORDS.filter(kw => textToCheck.includes(kw)).length;
  
  const relevanceScore = positiveMatches - (negativeMatches * 2);
  
  // If very low relevance and no clear category match
  if (relevanceScore < -2) {
    rejectedSuppliers.push({
      id: supplier.id,
      slug: supplier.slug,
      domain: domain,
      reason: 'low_relevance',
      score: relevanceScore,
      name: supplier.name
    });
    stats.lowRelevance++;
    return;
  }
  
  // Step 3: Phone normalization
  let phone = supplier.phone || '';
  let phoneStatus = 'ok';
  
  if (!phone || phone.length < 10) {
    phoneStatus = 'needs_manual';
    stats.missingPhone++;
    needsManual.push({
      id: supplier.id,
      slug: supplier.slug,
      name: supplier.name,
      domain: domain,
      reason: 'missing_phone'
    });
  } else {
    // Normalize phone to +7XXXXXXXXXX
    phone = phone.replace(/[^\d]/g, '');
    if (phone.startsWith('8') && phone.length === 11) {
      phone = '+7' + phone.slice(1);
    } else if (phone.startsWith('7') && phone.length === 11) {
      phone = '+' + phone;
    } else if (phone.length === 10) {
      phone = '+7' + phone;
    }
  }
  
  // Step 4: Punycode decode for display
  let domainDisplay = domain;
  try {
    domainDisplay = domain.includes('xn--') 
      ? require('punycode').toUnicode(domain) 
      : domain;
  } catch (e) {
    domainDisplay = domain;
  }
  
  // Keep supplier
  cleanSuppliers.push({
    ...supplier,
    phone: phone,
    phoneStatus: phoneStatus,
    domain_ascii: domain,
    domain_display: domainDisplay,
    relevanceScore: relevanceScore
  });
  stats.kept++;
});

// Save outputs
fs.writeFileSync(
  path.join(__dirname, '../data/suppliers_clean.json'),
  JSON.stringify(cleanSuppliers, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../data/rejected_suppliers.json'),
  JSON.stringify(rejectedSuppliers, null, 2)
);

fs.writeFileSync(
  path.join(__dirname, '../data/needs_manual_contacts.json'),
  JSON.stringify(needsManual, null, 2)
);

// Generate report
const report = `# Data Quality Report

Generated: ${new Date().toISOString()}

## Summary

| Metric | Count |
|--------|-------|
| Total processed | ${stats.total} |
| Kept (clean) | ${stats.kept} |
| Blacklisted | ${stats.blacklisted} |
| Low relevance | ${stats.lowRelevance} |
| Missing phone | ${stats.missingPhone} |

## Rejection Reasons

${rejectedSuppliers.reduce((acc, s) => {
  acc[s.reason] = (acc[s.reason] || 0) + 1;
  return acc;
}, {})}

## Top Rejected Domains

${rejectedSuppliers.slice(0, 10).map(s => `- ${s.domain} (${s.reason})`).join('\n')}

## Needs Manual Contact

${needsManual.length} suppliers need manual phone verification.
`;

fs.writeFileSync(path.join(__dirname, '../data/clean_report.md'), report);

console.log('\n=== RESULTS ===');
console.log(`Total: ${stats.total}`);
console.log(`Kept: ${stats.kept}`);
console.log(`Blacklisted: ${stats.blacklisted}`);
console.log(`Low relevance: ${stats.lowRelevance}`);
console.log(`Missing phone: ${stats.missingPhone}`);
console.log('\nFiles created:');
console.log('- data/suppliers_clean.json');
console.log('- data/rejected_suppliers.json');
console.log('- data/needs_manual_contacts.json');
console.log('- data/clean_report.md');
