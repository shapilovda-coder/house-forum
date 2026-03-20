#!/usr/bin/env node
/**
 * Ranking Layer
 * Computes sort_score and generates ranked_lists.json
 * 
 * Scoring:
 * 1. Pinned suppliers (priority 1, 2) — always first
 * 2. Clicks from ranking_signals (desc)
 * 3. Fallback: has_phone (+10), has_address (+5), has_description (+3)
 */

const fs = require('fs');
const path = require('path');

// Load data
const suppliers = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/suppliers_clean.json'), 'utf8'));
const pinned = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/pinned_suppliers.json'), 'utf8'));
const signals = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/ranking_signals.json'), 'utf8'));

console.log('Computing rankings...');
console.log(`Suppliers: ${suppliers.length}`);
console.log(`Pinned: ${pinned.length}`);
console.log(`Signals: ${signals.length}`);

// Build lookup maps
const pinnedMap = new Map(); // domain -> priority
pinned.forEach(p => {
  pinnedMap.set(p.domain, p.priority);
});

const signalsMap = new Map(); // "category|region|domain" -> clicks
signals.forEach(s => {
  const key = `${s.category}|${s.region}|${s.domain}`;
  signalsMap.set(key, s.clicks);
});

// Get domain from supplier
function getDomain(supplier) {
  return supplier.domain_ascii || 
         supplier.website?.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] ||
         supplier.slug;
}

// Compute score for supplier in context of (category, region)
function computeScore(supplier, category, region) {
  const domain = getDomain(supplier);
  
  // Check pinned
  const pinnedPriority = pinnedMap.get(domain);
  if (pinnedPriority) {
    // Verify categories/regions match
    const pinnedEntry = pinned.find(p => p.domain === domain);
    const catMatch = pinnedEntry.categories.includes('*') || 
                     pinnedEntry.categories.includes(category);
    const regMatch = pinnedEntry.regions.includes('*') || 
                     pinnedEntry.regions.includes(region);
    if (catMatch && regMatch) {
      return { score: 10000 - pinnedPriority, source: `pinned:${pinnedPriority}` };
    }
  }
  
  // Check signals
  const signalKey = `${category}|${region}|${domain}`;
  const clicks = signalsMap.get(signalKey);
  if (clicks) {
    return { score: 1000 + clicks, source: `clicks:${clicks}` };
  }
  
  // Fallback scoring
  let fallbackScore = 0;
  let factors = [];
  
  if (supplier.phone && supplier.phone.length > 10) {
    fallbackScore += 10;
    factors.push('phone');
  }
  if (supplier.address && supplier.address.length > 5) {
    fallbackScore += 5;
    factors.push('address');
  }
  if (supplier.description && supplier.description.length > 20) {
    fallbackScore += 3;
    factors.push('description');
  }
  
  return { score: fallbackScore, source: factors.join(',') || 'none' };
}

// Generate ranked lists per (category, region)
const rankedLists = {};
const coverageStats = {
  totalCombinations: 0,
  withClicks: 0,
  withPinned: 0,
  withFallbackOnly: 0
};

// Get unique categories and regions from suppliers
const categoryRegionCombos = new Set();
suppliers.forEach(s => {
  s.categories.forEach(cat => {
    const catSlug = cat.category?.slug || cat.slug || cat;
    s.regions.forEach(reg => {
      categoryRegionCombos.add(`${catSlug}|${reg.slug}`);
    });
  });
});

coverageStats.totalCombinations = categoryRegionCombos.size;

// For each combo, rank suppliers
Array.from(categoryRegionCombos).forEach(comboKey => {
  const [category, region] = comboKey.split('|');
  
  // Filter suppliers for this combo
  const comboSuppliers = suppliers.filter(s => {
    const hasCategory = s.categories.some(c => {
      const slug = c.category?.slug || c.slug || c;
      return slug === category;
    });
    const hasRegion = s.regions.some(r => r.slug === region);
    return hasCategory && hasRegion && s.status === 'active';
  });
  
  // Score and sort
  const scored = comboSuppliers.map(s => {
    const domain = getDomain(s);
    const { score, source } = computeScore(s, category, region);
    return { domain, score, source, supplier: s };
  });
  
  // Track coverage
  const hasClicks = scored.some(s => s.source.startsWith('clicks:'));
  const hasPinned = scored.some(s => s.source.startsWith('pinned:'));
  if (hasClicks) coverageStats.withClicks++;
  if (hasPinned) coverageStats.withPinned++;
  if (!hasClicks && !hasPinned) coverageStats.withFallbackOnly++;
  
  // Sort by score desc
  scored.sort((a, b) => b.score - a.score);
  
  // Store only domains (for smaller file)
  rankedLists[comboKey] = scored.map(s => ({
    domain: s.domain,
    score: s.score,
    source: s.source
  }));
});

// Save ranked lists
fs.writeFileSync(
  path.join(__dirname, '../data/ranked_lists.json'),
  JSON.stringify(rankedLists, null, 2)
);

// Update report
const reportPath = path.join(__dirname, '../data/clean_report.md');
let report = fs.readFileSync(reportPath, 'utf8');

const rankingSection = `

## Ranking Coverage

| Metric | Count |
|--------|-------|
| Total (category, region) combinations | ${coverageStats.totalCombinations} |
| With click data | ${coverageStats.withClicks} |
| With pinned suppliers | ${coverageStats.withPinned} |
| Fallback only | ${coverageStats.withFallbackOnly} |

### Pinned Suppliers
${pinned.map(p => `- ${p.domain} (priority ${p.priority})`).join('\n')}

### Ranking Signals
- Total signals: ${signals.length}
- Categories covered: ${new Set(signals.map(s => s.category)).size}
- Regions covered: ${new Set(signals.map(s => s.region)).size}

### Output Files
- data/pinned_suppliers.json — pinned priorities
- data/ranking_signals.json — click data
- data/ranked_lists.json — computed rankings per (category, region)
`;

report += rankingSection;
fs.writeFileSync(reportPath, report);

console.log('\n=== RANKING RESULTS ===');
console.log(`Combinations: ${coverageStats.totalCombinations}`);
console.log(`With clicks: ${coverageStats.withClicks}`);
console.log(`With pinned: ${coverageStats.withPinned}`);
console.log(`Fallback only: ${coverageStats.withFallbackOnly}`);
console.log('\nFiles created:');
console.log('- data/pinned_suppliers.json');
console.log('- data/ranking_signals.json');
console.log('- data/ranked_lists.json');
console.log('- clean_report.md updated');
