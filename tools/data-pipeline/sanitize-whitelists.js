#!/usr/bin/env node
// scripts/sanitize-whitelists.js — Clean up whitelist data
// Run: node scripts/sanitize-whitelists.js

const fs = require('fs')
const path = require('path')

const WHITELISTS_DIR = path.join(__dirname, '..', 'data', 'published', 'whitelists')

// Import sanitization logic (inline copy to avoid TS issues)
function sanitizeText(input) {
  if (!input || typeof input !== 'string') return null
  
  let sanitized = input
  
  // Strip HTML tags
  sanitized = sanitized.replace(/<[^>]+>/g, ' ')
  
  // Remove broken attributes like *.png">, *.jpg">
  sanitized = sanitized.replace(/\S+\.(png|jpg|jpeg|gif|svg)["']?\s*>?/gi, ' ')
  
  // Remove other HTML artifacts
  sanitized = sanitized.replace(/href\s*=\s*["']?/gi, ' ')
  sanitized = sanitized.replace(/src\s*=\s*["']?/gi, ' ')
  sanitized = sanitized.replace(/alt\s*=\s*["']?/gi, ' ')
  
  // Decode common entities
  sanitized = sanitized.replace(/&quot;/g, '"')
  sanitized = sanitized.replace(/&amp;/g, '&')
  sanitized = sanitized.replace(/&lt;/g, '<')
  sanitized = sanitized.replace(/&gt;/g, '>')
  sanitized = sanitized.replace(/&nbsp;/g, ' ')
  
  // Collapse whitespace and trim
  sanitized = sanitized.replace(/\s+/g, ' ').trim()
  
  return sanitized.length > 0 ? sanitized : null
}

function normalizeParseStatus(status) {
  if (!status || typeof status !== 'string') return 'partial'
  return status.toLowerCase().trim()
}

function processWhitelist(filePath) {
  const raw = fs.readFileSync(filePath, 'utf-8')
  const data = JSON.parse(raw)
  
  if (!Array.isArray(data)) {
    console.log(`  Skipping ${path.basename(filePath)}: not an array`)
    return null
  }
  
  let changed = false
  
  const cleaned = data.map((entry, idx) => {
    const original = { ...entry }
    
    // Sanitize address
    if (entry.address) {
      const sanitized = sanitizeText(entry.address)
      if (sanitized !== entry.address) {
        entry.address = sanitized
        changed = true
        console.log(`  [${idx}] Address sanitized: "${original.address?.substring(0, 50)}..." -> "${sanitized?.substring(0, 50)}..."`)
      }
    }
    
    // Normalize parse_status
    const normalized = normalizeParseStatus(entry.parse_status)
    if (normalized !== entry.parse_status) {
      entry.parse_status = normalized
      changed = true
      console.log(`  [${idx}] parse_status normalized: "${original.parse_status}" -> "${normalized}"`)
    }
    
    return entry
  })
  
  return { cleaned, changed }
}

function main() {
  console.log('Sanitizing whitelists...\n')
  
  if (!fs.existsSync(WHITELISTS_DIR)) {
    console.error(`Directory not found: ${WHITELISTS_DIR}`)
    process.exit(1)
  }
  
  const files = fs.readdirSync(WHITELISTS_DIR).filter(f => f.endsWith('.json') && !f.includes('_urls'))
  
  let totalFiles = 0
  let changedFiles = 0
  
  for (const file of files) {
    const filePath = path.join(WHITELISTS_DIR, file)
    console.log(`Processing: ${file}`)
    
    const result = processWhitelist(filePath)
    if (!result) continue
    
    totalFiles++
    
    if (result.changed) {
      fs.writeFileSync(filePath, JSON.stringify(result.cleaned, null, 2), 'utf-8')
      console.log(`  ✓ Saved changes\n`)
      changedFiles++
    } else {
      console.log(`  No changes needed\n`)
    }
  }
  
  console.log(`\nDone: ${changedFiles}/${totalFiles} files modified`)
}

main()
