import { test, expect } from '@playwright/test'

test.describe('Homepage', () => {
  test('should display header and footer', async ({ page }) => {
    await page.goto('/')
    
    // Check header
    await expect(page.locator('header')).toBeVisible()
    await expect(page.locator('text=СтройСейлс')).toBeVisible()
    
    // Check footer
    await expect(page.locator('footer')).toBeVisible()
    await expect(page.locator('text=© 2026 СтройСейлс')).toBeVisible()
  })
  
  test('should have category tiles', async ({ page }) => {
    await page.goto('/')
    
    await expect(page.locator('text=Прозрачные рольставни')).toBeVisible()
    await expect(page.locator('text=Защитные рольставни')).toBeVisible()
    await expect(page.locator('text=Ворота')).toBeVisible()
  })
  
  test('should navigate to category page', async ({ page }) => {
    await page.goto('/')
    
    await page.click('text=Прозрачные рольставни')
    await expect(page).toHaveURL(/.*prozrachnye-rolstavni/)
  })
})
