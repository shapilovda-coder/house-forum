// lib/catalogMode.ts — Single source of truth for category modes
// STRICT RULE: Never add fallback to catalog for whitelist categories

export type CatalogMode = "whitelist" | "catalog";

// Categories that operate in strict whitelist mode
// Whitelist categories ONLY read from data/published/whitelists/
// NO fallback to suppliers_clean.json EVER
export const WHITELIST_CATEGORIES = new Set([
  "prozrachnye-rolstavni",
  "zashitnye-rolstavni",
  "rolletnye-shkafy",
  "myagkie-okna",
  "vorota",
  "bezramnoe-osteklenie",
  "ofisnye-peregorodki",
]);

/**
 * Get catalog mode for category
 * @param category — category slug
 * @returns "whitelist" or "catalog"
 */
export function getCatalogMode(category: string): CatalogMode {
  return WHITELIST_CATEGORIES.has(category) ? "whitelist" : "catalog";
}

/**
 * Check if category is whitelist mode
 * Use this for strict mode enforcement (no fallback)
 */
export function isWhitelistMode(category: string): boolean {
  return WHITELIST_CATEGORIES.has(category);
}

/**
 * Check if category is catalog mode
 */
export function isCatalogMode(category: string): boolean {
  return !WHITELIST_CATEGORIES.has(category);
}
