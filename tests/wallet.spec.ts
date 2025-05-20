import { test, expect } from '@playwright/test';

test.describe('Wallet Connection', () => {
  test('should display RainbowKit modal when Connect Wallet is clicked', async ({ page }) => {
    // 1. Navigate to the home page (e.g., /eth)
    await page.goto('/eth');

    // 2. Check if the "Connect Wallet" button (from RainbowKit) is visible.
    // RainbowKit typically uses a button with "Connect Wallet" text.
    // We'll use a selector that's likely to target it.
    const connectWalletButton = page.locator('button:has-text("Connect Wallet")');
    await expect(connectWalletButton).toBeVisible({ timeout: 10000 }); // Increased timeout for initial load

    // 3. Click the "Connect Wallet" button.
    await connectWalletButton.click();

    // 4. Verify that the RainbowKit modal appears.
    // RainbowKit modal typically has a heading like "Connect a Wallet" or similar.
    // We'll look for a common element within the modal.
    // It's good practice to use a more specific selector if available from RainbowKit's documentation or by inspecting the DOM.
    const modalHeader = page.locator('[role="dialog"] :text("Connect Wallet"), [role="dialog"] :text("Connect a Wallet")'); // Common modal titles
    
    // It's possible the text "Connect Wallet" is also the button text, so we ensure the modal itself.
    // A more robust selector would be to look for the main modal container, e.g. by its `aria-modal="true"` attribute or a specific class name.
    const rainbowKitModal = page.locator('[role="dialog"][aria-modal="true"]');
    
    await expect(rainbowKitModal).toBeVisible({ timeout: 5000 }); // Modal should appear quickly
    // Also check for a more specific text within the modal to be sure
    await expect(modalHeader.or(page.locator('[role="dialog"] :text("Choose your preferred wallet")'))).toBeVisible({timeout: 5000});
  });
});
