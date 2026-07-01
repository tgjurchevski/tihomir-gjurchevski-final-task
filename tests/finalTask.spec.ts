import { test, expect } from '@playwright/test';

test('setup sanity test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
});