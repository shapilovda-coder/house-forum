#!/usr/bin/env node
// scripts/add-pinned-to-whitelists.js — Add Stekloroll and Artalico to whitelist files

const fs = require('fs')
const path = require('path')

const WHITELISTS_DIR = path.join(__dirname, '..', 'data', 'published', 'whitelists')

// Pinned brand definitions
const PINNED_BRANDS = {
  stekloroll: {
    source_url: 'https://stekloroll.ru',
    url: 'https://stekloroll.ru',
    domain: 'stekloroll.ru',
    display_domain: 'stekloroll.ru',
    company_name: 'StekloRoll',
    phones: ['+74951510979'], // From website
    address: 'Москва, Киевское шоссе, д.1, к.Б, БЦ Румянцево',
    parse_status: 'ok',
    priority: 100, // Highest priority
    is_pinned: true
  },
  artalico: {
    source_url: 'https://artalico.ru',
    url: 'https://artalico.ru',
    domain: 'artalico.ru',
    display_domain: 'artalico.ru',
    company_name: 'Artalico',
    phones: ['+74951510979'], // Same contact
    address: null,
    parse_status: 'ok',
    priority: 90, // Second priority
    is_pinned: true
  }
}

// Which categories get which pinned brands
const CATEGORY_PINS = {
  'prozrachnye-rolstavni': ['stekloroll'], // Only Stekloroll
  'zashitnye-rolstavni': ['stekloroll'],
  'rolletnye-shkafy': ['stekloroll'],
  'vorota': ['stekloroll'],
  'bezramnoe-osteklenie': ['stekloroll', 'artalico'], // Both
  'myagkie-okna': [], // No pinned (auxiliary category)
}

function addPinnedToWhitelist(filePath, pinsToAdd) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)
  
  if (!Array.isArray(data)) {
    console.log(`  Skipping ${path.basename(filePath)}: not an array`)
    return false
  }
  
  let changed = false
  
  // Check which pins are missing
  const existingDomains = new Set(data.map(e => e.domain?.toLowerCase() || e.display_domain?.toLowerCase()))
  
  for (const pinKey of pinsToAdd) {
    const pin = PINNED_BRANDS[pinKey]
    const domainLower = pin.domain.toLowerCase()
    
    if (!existingDomains.has(domainLower)) {
      // Add to beginning of array
      data.unshift({ ...pin })
      console.log(`  Added ${pinKey} (${pin.domain})`)
      changed = true
    } else {
      console.log(`  ${pinKey} already exists`)
    }
  }
  
  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  }
  
  return changed
}

function main() {
  console.log('Adding pinned brands to whitelists...\n')
  
  if (!fs.existsSync(WHITELISTS_DIR)) {
    console.error(`Directory not found: ${WHITELISTS_DIR}`)
    process.exit(1)
  }
  
  const files = fs.readdirSync(WHITELISTS_DIR).filter(f => f.endsWith('.json') && !f.includes('_urls'))
  
  let totalChanged = 0
  
  for (const file of files) {
    // Extract category from filename (category_region.json)
    const match = file.match(/^(.+)_(.+?)\.json$/)
    if (!match) continue
    
    const category = match[1]
    const region = match[2]
    
    const pins = CATEGORY_PINS[category] || []
    if (pins.length === 0) {
      console.log(`${file}: no pins for category ${category}`)
      continue
    }
    
    console.log(`Processing: ${file} (pins: ${pins.join(', ')})`)
    
    const filePath = path.join(WHITELISTS_DIR, file)
    const changed = addPinnedToWhitelist(filePath, pins)
    
    if (changed) {
      console.log(`  ✓ Updated\n`)
      totalChanged++
    } else {
      console.log(`  No changes\n`)
    }
  }
  
  console.log(`\nDone: ${totalChanged} files updated`)
}

main()
