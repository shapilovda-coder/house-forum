// Фото для категорий
export const categoryPhotos: Record<string, string> = {
  'prozrachnye-rolstavni': '/categories/prozrachnye.jpg',
  'zashitnye-rolstavni': '/categories/zashchitnye.jpg',
  'bezramnoe-osteklenie': '/categories/bezramnoe.jpg',
  'vorota': '/categories/vorota.png',
  'myagkie-okna': '/categories/myagkie.jpg',
  'rolletnye-shkafy': '/categories/rolletnye.jpg',
  'ofisnye-peregorodki': '/categories/ofisnye.jpg',
};

export function getCategoryPhoto(slug: string): string {
  return categoryPhotos[slug] || '/categories/default.jpg';
}
