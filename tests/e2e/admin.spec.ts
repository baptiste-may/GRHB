import { test, expect } from '@playwright/test'

test.describe('Administration', () => {
  test('admin page should display login form', async ({ page }) => {
    await page.goto('/admin')
    await expect(page.getByPlaceholder('Entrez le mot de passe')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Accéder' })).toBeVisible()
  })
})
