import { test, expect } from '@playwright/test'

test.describe('Basic Navigation', () => {
  test('homepage should display with correct title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/GRHB/)
    // Check for header presence
    await expect(page.locator('header')).toBeVisible()
  })

  test('should navigate to Presentation page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Présentation')
    await expect(page).toHaveURL(/\/about/)
    // Check for the presence of the container that holds the content
    await expect(page.locator('.mx-auto.px-6.py-8')).toBeVisible()
  })

  test('should navigate to Contact page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=Nous Contacter')
    await expect(page).toHaveURL(/\/contact/)
    await expect(page.locator('form')).toBeVisible()
  })
})
