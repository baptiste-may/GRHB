import { test, expect } from '@playwright/test'

test.describe('Blog and Content', () => {
  test('publications link should be visible in header', async ({ page }) => {
    await page.goto('/')
    const publicationsLink = page.locator('header').locator('text=Publications')
    await expect(publicationsLink).toBeVisible()
  })

  test('latest posts section should be visible', async ({ page }) => {
    await page.goto('/')
    const latestPostsHeading = page.locator('h2:has-text("Derniers posts")')
    await expect(latestPostsHeading).toBeVisible()
  })
})
