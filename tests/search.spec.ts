import { test, expect } from '@playwright/test'

test.describe('Search', () => {
  test('should open search with Cmd+K', async ({ page }) => {
    await page.goto('/')
    
    // Press Cmd+K
    await page.keyboard.press('Meta+k')
    
    // Check search modal is visible
    await expect(page.locator('text=Поиск по каталогу')).toBeVisible()
  })
  
  test('should search for categories', async ({ page }) => {
    await page.goto('/')
    
    // Open search
    await page.keyboard.press('Meta+k')
    
    // Type search query
    await page.fill('input[placeholder="Поиск по каталогу..."]', 'рольставни')
    
    // Check results
    await expect(page.locator('text=Прозрачные рольставни')).toBeVisible()
    await expect(page.locator('text=Защитные рольставни')).toBeVisible()
  })
  
  test('should close search with ESC', async ({ page }) => {
    await page.goto('/')
    
    // Open and close
    await page.keyboard.press('Meta+k')
    await expect(page.locator('text=Поиск по каталогу')).toBeVisible()
    
    await page.keyboard.press('Escape')
    await expect(page.locator('text=Поиск по каталогу')).not.toBeVisible()
  })
})
