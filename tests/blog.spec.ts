import { test, expect } from '@playwright/test'

test.describe('Blog', () => {
  test('should display blog page', async ({ page }) => {
    await page.goto('/blog/')
    
    await expect(page.locator('h1')).toContainText('Блог')
    await expect(page.locator('text=Прозрачные рольставни для веранды')).toBeVisible()
  })
  
  test('should navigate to article page', async ({ page }) => {
    await page.goto('/blog/')
    
    await page.click('text=Защитные рольставни для дачи')
    await expect(page).toHaveURL(/.*zashitnye-rolstavni-dlya-dachi/)
    await expect(page.locator('h1')).toContainText('Защитные рольставни для дачи')
  })
  
  test('should have Schema.org markup', async ({ page }) => {
    await page.goto('/blog/zashitnye-rolstavni-dlya-dachi/')
    
    // Check for JSON-LD script
    const jsonLd = await page.locator('script[type="application/ld+json"]').first()
    await expect(jsonLd).toBeVisible()
  })
})
