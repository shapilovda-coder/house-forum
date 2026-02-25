// lib/validators/address.ts — Strict address validation

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
 * Validate address string
 * @param address — raw address string
 * @returns { isValid: boolean, reason?: string }
 */
export function validateAddress(address: string | null | undefined): { 
  isValid: boolean
  reason?: string 
} {
  if (!address || typeof address !== 'string') {
    return { isValid: false, reason: 'empty' }
  }
  
  const trimmed = address.trim()
  
  if (trimmed.length === 0) {
    return { isValid: false, reason: 'empty' }
  }
  
  if (trimmed.length > MAX_ADDRESS_LENGTH) {
    return { isValid: false, reason: 'too_long' }
  }
  
  // Check for garbage patterns
  for (const pattern of GARBAGE_PATTERNS) {
    if (pattern.test(trimmed)) {
      return { isValid: false, reason: 'garbage_pattern' }
    }
  }
  
  // Must contain street keyword
  const hasStreet = STREET_KEYWORDS.some(kw => {
    const regex = new RegExp(kw, 'i')
    return regex.test(trimmed)
  })
  
  if (!hasStreet) {
    return { isValid: false, reason: 'no_street' }
  }
  
  // Must contain house number pattern
  const hasHouse = HOUSE_PATTERNS.some(pattern => {
    const regex = new RegExp(pattern, 'i')
    return regex.test(trimmed)
  })
  
  if (!hasHouse) {
    return { isValid: false, reason: 'no_house' }
  }
  
  return { isValid: true }
}

/**
 * Filter address — return null if invalid
 * Use this for UI rendering
 */
export function filterAddress(address: string | null | undefined): string | null {
  const result = validateAddress(address)
  return result.isValid ? address!.trim() : null
}
