// SVG иконки для категорий (sprite-based)
export const categoryIcons: Record<string, string> = {
  'prozrachnye-rolstavni': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="4" y="5" width="16" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M6.5 8h11M6.5 11h11M6.5 14h11M6.5 17h11" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".95"/>
      <path d="M7.2 6.2l9.6 11.6" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".35"/>
    </svg>
  `,
  'zashchitnye-rolstavni': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3.5L19 6.8v6.1c0 4.7-3 7.8-7 9-4-1.2-7-4.3-7-9V6.8L12 3.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M9.2 13.2v-1.1a2.8 2.8 0 115.6 0v1.1" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <rect x="8.6" y="13.2" width="6.8" height="5.2" rx="1.2" stroke="currentColor" stroke-width="2"/>
    </svg>
  `,
  'bezramnoe-osteklenie': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 9.5L12 4l8 5.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 10.5v9M12 10.5v9M17 10.5v9" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".95"/>
      <path d="M6 19.5h12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `,
  'avtomaticheskie-vorota': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 10.2L12 5l7 5.2V19a1.5 1.5 0 01-1.5 1.5h-11A1.5 1.5 0 015 19v-8.8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 12.5h8M8 15h8M8 17.5h8" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".95"/>
    </svg>
  `,
  'myagkie-okna': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 6.5h10a2 2 0 012 2V11c0 2.2-1.8 4-4 4H9a4 4 0 01-4-4V8.5a2 2 0 012-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M8 15.2v2.3M16 15.2v2.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      <path d="M8.2 10.2c1.6-1 3.9-1 5.6 0s4 .9 5.6 0" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".75"/>
    </svg>
  `,
  'rolletnye-shkafy': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 6.5h12a2 2 0 012 2V19a1.5 1.5 0 01-1.5 1.5H5.5A1.5 1.5 0 014 19V8.5a2 2 0 012-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <path d="M7.3 9.2h9.4M7.3 11.3h9.4M7.3 13.4h9.4M7.3 15.5h9.4" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".95"/>
      <path d="M7 20.5v1M17 20.5v1" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".8"/>
    </svg>
  `,
  'ofisnye-peregorodki': `
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5.5" width="14" height="13" rx="2" stroke="currentColor" stroke-width="2"/>
      <path d="M9.7 5.5v13M14.3 5.5v13" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".95"/>
      <path d="M7 20h10" stroke="currentColor" stroke-width="2" stroke-linecap="round" opacity=".85"/>
    </svg>
  `
};

// Функция для получения иконки
export function getCategoryIcon(slug: string): string {
  return categoryIcons[slug] || categoryIcons['prozrachnye-rolstavni'];
}