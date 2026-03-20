// lib/validators/address.ts — Strict address validation + sanitization

const STREET_KEYWORDS = [
  'ул\\.?', 'улица',
  'пр\\.?', 'проспект', 'пр-т',
  'ш\\.?', 'шоссе',
  'проезд',
  'пер\\.?', 'переулок',
  'бул\\.?', 'бульвар',
  'наб\\.?', 'набережная',
  'пл\\.?', 'площадь',
]

const HOUSE_PATTERNS = [
  'д\\.?\\s*\\d+',
  'дом\\s*\\d+',
  'корп\\.?\\s*\\d+',
  'строение\\s*\\d+',
  ',\\s*\\d+[^,]*$',
]

const GARBAGE_PATTERNS = [
  /в других регионах/i,
  /социальных сетях/i,
  /мессенджерах/i,
  /работаем по РФ/i,
  /работаем по россии/i,
  /доставка/i,
  /доставляем/i,
  /самовывоз/i,
  /только самовывоз/i,
  /по предоплате/i,
  /наличие уточняйте/i,
  /уточняйте по телефону/i,
]

const MAX_ADDRESS_LENGTH = 200

/**
 * Sanitize text: strip HTML, decode entities, remove broken attributes
 * @param input — raw string
 * @returns sanitized string
 */
export function sanitizeText(input: string | null | undefined): string | null {
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

/**
 * Validate address string
 * @param address — raw address string (will be sanitized first)
 * @returns { isValid: boolean, reason?: string }
 */
export function validateAddress(address: string | null | undefined): { 
  isValid: boolean
  reason?: string 
} {
  // First sanitize
  const sanitized = sanitizeText(address)
  
  if (!sanitized) {
    return { isValid: false, reason: 'empty' }
  }
  
  if (sanitized.length > MAX_ADDRESS_LENGTH) {
    return { isValid: false, reason: 'too_long' }
  }
  
  // Check for garbage patterns
  for (const pattern of GARBAGE_PATTERNS) {
    if (pattern.test(sanitized)) {
      return { isValid: false, reason: 'garbage_pattern' }
    }
  }
  
  // Must contain street keyword
  const hasStreet = STREET_KEYWORDS.some(kw => {
    const regex = new RegExp(kw, 'i')
    return regex.test(sanitized)
  })
  
  if (!hasStreet) {
    return { isValid: false, reason: 'no_street' }
  }
  
  // Must contain house number pattern
  const hasHouse = HOUSE_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern, 'i')
    return regex.test(sanitized)
  })
  
  if (!hasHouse) {
    return { isValid: false, reason: 'no_house' }
  }
  
  return { isValid: true }
}

/**
 * Filter address — return sanitized string if valid, null otherwise
 * Use this for UI rendering
 */
export function filterAddress(address: string | null | undefined): string | null {
  const sanitized = sanitizeText(address)
  if (!sanitized) return null
  
  const result = validateAddress(sanitized)
  return result.isValid ? sanitized : null
}
