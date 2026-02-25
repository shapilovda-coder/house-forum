SELECT 
  c.id,
  c.name as city_name,
  c.slug as city_slug,
  r.name as region_name,
  r.slug as region_slug,
  COUNT(comp.id) as companies_count
FROM cities c
LEFT JOIN regions r ON c.region_id = r.id
LEFT JOIN companies comp ON comp.city_id = c.id AND comp.status = 'active'
GROUP BY c.id, c.name, c.slug, r.name, r.slug
ORDER BY r.name, c.name;
