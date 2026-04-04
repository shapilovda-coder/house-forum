#!/usr/bin/env node
/**
 * Whitelist Parser
 * Parses supplier websites to extract phone, address, title
 * Respects rate limits: 1-2 req/sec, retry 2x, timeout 10-15s
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Parse command line args
const args = process.argv.slice(2);
let category = 'prozrachnye-rolstavni';
let region = 'moskva-i-mo';

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--category' && args[i + 1]) category = args[i + 1];
  if (args[i] === '--region' && args[i + 1]) region = args[i + 1];
}

const whitelistPath = path.join(__dirname, `../data/whitelists/${category}_${region}_urls.json`);
const outputPath = path.join(__dirname, `../data/whitelists/${category}_${region}.json`);

if (!fs.existsSync(whitelistPath)) {
  console.error(`Whitelist not found: ${whitelistPath}`);
  process.exit(1);
}

const urls = JSON.parse(fs.readFileSync(whitelistPath, 'utf8'));
console.log(`Parsing ${urls.length} URLs for ${category}/${region}...`);

// Helper: sleep
const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Helper: decode punycode for display
function decodePunycode(domain: string): string {
  try {
    if (domain.includes('xn--')) {
      return require('punycode').toUnicode(domain);
    }
    return domain;
  } catch (e) {
    return domain;
  }
}

// Helper: extract domain from URL
function extractDomain(url: string): string {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname.replace(/^www\./, '');
  } catch (e) {
    return url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0];
  }
}

// Fetch result type
type FetchResult = {
  html: string;
  status: number;
};

// Helper: fetch with timeout and retry
async function fetchWithRetry(url: string, retries = 2, timeout = 15000): Promise<FetchResult> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const result = await fetchWithTimeout(url, timeout);
      return result;
    } catch (err) {
      if (attempt === retries) throw err;
      console.log(`  Retry ${attempt + 1} for ${url}`);
      await sleep(1000 * (attempt + 1));
    }
  }

  throw new Error(`Failed to fetch ${url} after ${retries + 1} attempts`);
}

function fetchWithTimeout(url: string, timeout: number): Promise<FetchResult> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https:') ? https : http;
    const req = client.get(url, {
      timeout,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; StroySalesBot/1.0; +https://stroysales.ru/bot)'
      }
    }, (res: any) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        // Follow redirect
        resolve(fetchWithTimeout(res.headers.location, timeout));
        return;
      }
      
      let data = '';
      res.on('data', (chunk: Buffer | string) => data += chunk.toString());
      res.on('end', () => resolve({ html: data, status: res.statusCode ?? 0 }));
    });
    
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Timeout'));
    });
    
    req.on('error', reject);
  });
}

// Extract phones from HTML
function extractPhones(html: string): string[] {
  const phones: string[] = [];
  
  // tel: links
  const telRegex = /tel:([+\d\s\(\)\-]+)/gi;
  let match;
  while ((match = telRegex.exec(html)) !== null) {
    phones.push(normalizePhone(match[1]));
  }
  
  // Phone patterns in text
  const phoneRegex = /(?:\+7|8)[\s\-]?\(?\d{3}\)?[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2}/g;
  const textMatches = html.match(phoneRegex) || [];
  textMatches.forEach(p => phones.push(normalizePhone(p)));
  
  // Unique and filter valid
  return [...new Set(phones)].filter(p => p && p.length >= 10);
}

// Normalize phone to +7XXXXXXXXXX
function normalizePhone(phone: string): string {
  if (!phone) return '';
  let digits = phone.replace(/[^\d]/g, '');
  if (digits.startsWith('8') && digits.length === 11) {
    digits = '7' + digits.slice(1);
  }
  if (!digits.startsWith('+') && digits.length === 11) {
    digits = '+' + digits;
  }
  return digits;
}

// Extract title from HTML
function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([^<]*)<\/title>/i);
  return match ? match[1].trim().replace(/\s+/g, ' ') : null;
}

// Extract address from HTML (basic patterns)
function extractAddress(html: string): string | null {
  // Look for common address patterns
  const patterns = [
    /address[^>]*>([^<]+)/i,
    /г\.\s*[^<,]+/i,
    /ул\.\s*[^<,]+/i,
    /пр\.\s*[^<,]+/i,
  ];
  
  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match) {
      let addr = match[0].replace(/<[^>]+>/g, '').trim();
      if (isValidAddress(addr)) return addr;
    }
  }
  return null;
}

// Strict address validation
function isValidAddress(address: string): boolean {
  if (!address || typeof address !== 'string') return false;
  
  // Max length check
  if (address.length > 200) return false;
  
  // Min length check
  if (address.length < 10) return false;
  
  // Reject garbage patterns
  const garbagePatterns = [
    /в других регионах/i,
    /социальных сетях/i,
    /мессенджерах/i,
    /телефон/i,
    /email/i,
    /e-mail/i,
    /почта/i,
    /связаться/i,
    /написать/i,
    /звоните/i,
  ];
  
  for (const pattern of garbagePatterns) {
    if (pattern.test(address)) return false;
  }
  
  // Must contain city (Moscow or Moscow region)
  const cityPattern = /(москва|московская\s*область|мо)/i;
  if (!cityPattern.test(address)) return false;
  
  // Must contain street indicator
  const streetPattern = /(ул\.?|улица|проспект|пр\.?|шоссе|ш\.?|проезд|переулок|пер\.?|бульвар|бул\.?|площадь|пл\.?|набережная|наб\.?)/i;
  if (!streetPattern.test(address)) return false;
  
  // Must contain house number (д. N, дом N, or just number at end)
  const housePattern = /(д\.?\s*\d+|дом\s*\d+|,\s*\d+\s*$|,\s*\d+[^,]*$)/i;
  if (!housePattern.test(address)) return false;
  
  return true;
}

// Main parsing loop
type ParseResult = {
  source_url: string;
  display_domain: string;
  company_name: string | null;
  phones: string[];
  address: string | null;
  region: string;
  category: string;
  updated_at: string;
  parse_status: 'failed' | 'partial' | 'ok';
  notes: string;
};

async function parseAll() {
  const results: ParseResult[] = [];
  
  for (const url of urls) {
    console.log(`\nParsing: ${url}`);
    const domain = extractDomain(url);
    const displayDomain = decodePunycode(domain);
    
    const result: ParseResult = {
      source_url: url,
      display_domain: displayDomain,
      company_name: null,
      phones: [],
      address: null,
      region: region,
      category: category,
      updated_at: new Date().toISOString(),
      parse_status: 'failed',
      notes: ''
    };
    
    try {
      const { html, status } = await fetchWithRetry(url, 2, 15000);
      
      if (status === 403 || status === 429) {
        result.parse_status = 'failed';
        result.notes = `Blocked by robots/server (${status})`;
        console.log(`  Blocked: ${status}`);
      } else if (html) {
        result.phones = extractPhones(html);
        result.company_name = extractTitle(html);
        result.address = extractAddress(html);
        
        // Determine parse status
        const hasPhones = result.phones.length > 0;
        const hasAddress = result.address !== null;
        
        if (hasPhones && hasAddress) {
          result.parse_status = 'ok';
          console.log(`  ✓ Phones: ${result.phones[0]}, Address: ${result.address!.substring(0, 50)}...`);
        } else if (hasPhones) {
          result.parse_status = 'partial';
          result.notes = 'Phone found, no valid address';
          console.log(`  ⚠ Phone: ${result.phones[0]}, No valid address`);
        } else if (hasAddress) {
          result.parse_status = 'partial';
          result.notes = 'Address found, no phone';
          console.log(`  ⚠ Address: ${result.address!.substring(0, 50)}..., No phone`);
        } else {
          result.parse_status = 'partial';
          result.notes = 'No phone or valid address';
          console.log(`  ⚠ No phone or valid address`);
        }
      }
    } catch (unknownErr) {
      const err = unknownErr instanceof Error ? unknownErr : new Error(String(unknownErr));
      result.parse_status = 'failed';
      result.notes = err.message;
      console.log(`  ✗ Error: ${err.message}`);
    }
    
    results.push(result);
    
    // Rate limit: 1-2 req/sec = 500-1000ms delay
    await sleep(800);
  }
  
  // Save results
  fs.writeFileSync(outputPath, JSON.stringify(results, null, 2));
  
  console.log('\n=== RESULTS ===');
  console.log(`Total: ${results.length}`);
  console.log(`OK: ${results.filter(r => r.parse_status === 'ok').length}`);
  console.log(`Partial: ${results.filter(r => r.parse_status === 'partial').length}`);
  console.log(`Failed: ${results.filter(r => r.parse_status === 'failed').length}`);
  console.log(`\nSaved to: ${outputPath}`);
}

parseAll().catch(console.error);
