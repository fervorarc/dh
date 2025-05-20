import { test, expect } from '@playwright/test';

test('should navigate to the eth page and check for Connect Wallet button', async ({ page }) => {
  await page.goto('/eth');
  // Wait for the page to load and check for the presence of an element with the text "Connect Wallet"
  const connectWalletButton = page.locator('text="Connect Wallet"');
  await expect(connectWalletButton).toBeVisible();
});
