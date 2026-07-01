import { test, expect } from '@playwright/test';

test('setup smoke test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);
});