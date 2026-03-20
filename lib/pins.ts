// lib/pins.ts — Pinned suppliers ordering

/**
 * Apply pinned ordering for whitelist suppliers
 * Stekloroll always #1, Artalico always #2 (if present in list)
 */
export function applyPins(suppliers: any[]): any[] {
  return suppliers.sort((a, b) => {
    // Stekloroll always first
    if (a.slug?.includes('stekloroll')) return -1
    if (b.slug?.includes('stekloroll')) return 1
    
    // Artalico always second
    if (a.slug?.includes('artalico')) return -1
    if (b.slug?.includes('artalico')) return 1
    
    // Keep original order for rest
    return 0
  })
}

/**
 * Check if supplier is pinned (Stekloroll or Artalico)
 */
export function isPinned(supplier: any): boolean {
  return supplier.slug?.includes('stekloroll') || supplier.slug?.includes('artalico')
}
