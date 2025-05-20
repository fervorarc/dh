import { test, expect } from '@playwright/test';

// --- Test Data ---
const TEST_TOKEN_ADDRESS = '0xTestTokenAddr001122334455';
const TEST_TOKEN_AMOUNT = '250';
let testUnlockDateISO: string; // Will be set in the test

test.describe('Create and View Locks Flow', () => {
  // Helper function to open the token lock dialog (adapted from token-lock.spec.ts)
  const navigateAndOpenDialogLockTokens = async (page: any) => {
    await page.goto('/eth/lock-tokens');
    await page.evaluate(() => {
      localStorage.setItem('wagmi.connected', 'true');
      localStorage.setItem('rk-recent', 'true');
    });
    await page.reload();

    const dialogTriggerButton = page.locator('button:has-text("Lock Tokens"), button:has-text("Create Lock")').first();
    await expect(dialogTriggerButton).toBeVisible({ timeout: 10000 });
    await dialogTriggerButton.click();

    const dialogContent = page.locator('[role="dialog"].sm\\:max-w-\\[425px\\]');
    await expect(dialogContent).toBeVisible({ timeout: 5000 });
    return dialogContent;
  };

  test('should create a lock and then view it on the My Locks page', async ({ page }) => {
    // --- 1. Comprehensive Mocking via addInitScript ---
    await page.addInitScript(() => {
      console.log('Playwright: Running addInitScript to mock useTokenLocker for create & view locks flow...');
      
      const internalUserLocks: any[] = []; // This will store locks created during the test
      let createLockLoading = false;
      let createLockSuccess = false;
      let createLockData: { hash: string } | null = null;

      // Assumes wagmi's write function calls this with an object like { args: [tokenAddr, amount, unlockTimestamp, ...] }
      // or directly with positional args if the hook is set up differently.
      // Based on useTokenLocker.ts, createLock is the 'write' function from useContractWrite.
      // It's typically called as: createLock({ args: [...] }) or createLock([arg1, arg2...]) if prepared.
      // Let's assume it's called with an object containing an 'args' array.
      const mockCreateLockFn = (options?: { args?: [string, bigint, bigint, number, bigint] }) => {
        console.log('Playwright: Mocked createLockFn called with options:', options);
        createLockLoading = true;
        createLockSuccess = false;
        createLockData = null;
        
        const contractArgs = options?.args;

        // Simulate adding the lock to our internal store on "success"
        setTimeout(() => {
          const newLock = {
            id: `mockLockId_${internalUserLocks.length + 1}`, // Generate a unique ID
            token: contractArgs ? contractArgs[0] : '0xUnknownToken',
            amount: contractArgs ? contractArgs[1] : 0n,
            lockedAt: BigInt(Math.floor(Date.now() / 1000) - 60), // Assume locked 1 min ago
            endsAt: contractArgs ? contractArgs[2] : BigInt(Math.floor(Date.now() / 1000) + 3600 * 24 * 7), // unlockDate is index 2
            multiplier: 100n, // Default multiplier, or derive if available from args
            claimed: false,
            nftId: contractArgs ? contractArgs[4] : 0n, // nftId is index 4
            lockType: contractArgs ? contractArgs[3] : 0, // lockType is index 3
          };
          internalUserLocks.push(newLock);
          
          createLockData = { hash: `0xmockedlocktxhash_${internalUserLocks.length}` };
          createLockSuccess = true;
          createLockLoading = false;
          console.log('Playwright: Mocked createLockFn operation completed. New lock added to mock store:', newLock);
        }, 500);
      };

      (window as any).__MOCK_WAGMI__ = {
        ...(window as any).__MOCK_WAGMI__,
        mockUseTokenLocker: () => {
          console.log('Playwright: mockUseTokenLocker called.');
          return {
            createLock: mockCreateLockFn,
            withdraw: () => console.log('Playwright: Mocked withdraw called'),
            userLocks: internalUserLocks, // Serve the dynamically populated list
            isCreatingLock: createLockLoading,
            isWithdrawing: false,
            _getCreateLockSuccess: () => createLockSuccess,
            _resetCreateLockSuccess: () => { createLockSuccess = false; } // Helper to reset for multiple actions if needed
          };
        }
      };
      // TODO: Ensure this mock is actually used by the application (e.g. via page.route or app modification for tests)
    });

    // --- Part 1: Create a Lock ---
    const dialogContent = await navigateAndOpenDialogLockTokens(page);

    const tokenAddressInput = dialogContent.locator('input#tokenAddress');
    const amountInput = dialogContent.locator('input#amount');
    const unlockDateInput = dialogContent.locator('input#unlockDate');

    await expect(tokenAddressInput).toBeVisible();
    await tokenAddressInput.fill(TEST_TOKEN_ADDRESS);

    await expect(amountInput).toBeVisible();
    await amountInput.fill(TEST_TOKEN_AMOUNT);

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90); // 90 days in the future
    testUnlockDateISO = futureDate.toISOString().split('T')[0];
    await expect(unlockDateInput).toBeVisible();
    await unlockDateInput.fill(testUnlockDateISO);

    const approveButton = dialogContent.locator('button:has-text("Approve")');
    await expect(approveButton).toBeVisible();
    await approveButton.click(); // Assume approve step is not blocked / also mocked if necessary

    const lockButtonInDialog = dialogContent.locator('button:has-text("Lock Tokens")');
    await expect(lockButtonInDialog).toBeVisible({ timeout: 5000 });
    await lockButtonInDialog.click();

    // Verify lock creation "success"
    await page.waitForFunction(() => (window as any).__MOCK_WAGMI__._getCreateLockSuccess() === true, { timeout: 5000 });
    await expect(dialogContent).not.toBeVisible({ timeout: 10000 }); // Dialog should close
    console.log(`Lock for ${TEST_TOKEN_ADDRESS} with amount ${TEST_TOKEN_AMOUNT} submitted.`);
     // Reset success flag if planning multiple actions, though not strictly needed here
    await page.evaluate(() => (window as any).__MOCK_WAGMI__._resetCreateLockSuccess());


    // --- Part 2: View the Created Lock ---
    await page.goto('/eth/my-locks'); // Navigate to where locks are displayed

    const locksTable = page.locator('role=table, [data-testid="locks-table"]');
    await expect(locksTable).toBeVisible({ timeout: 10000 });

    // Verify the newly created lock is in the table
    // We need to be careful with how data is formatted in the table (e.g. token amount, dates)
    const createdLockRow = locksTable.locator(`tr:has-text("${TEST_TOKEN_ADDRESS}")`);
    await expect(createdLockRow).toBeVisible();

    // Check amount (this might need adjustment based on how it's formatted, e.g. decimals)
    await expect(createdLockRow).toHaveText(new RegExp(TEST_TOKEN_AMOUNT));

    // Check unlock date (this also needs careful formatting checks)
    // The table might format the date. For now, a loose check.
    // Example: if date is YYYY-MM-DD, it might be displayed as MM/DD/YYYY or Month D, YYYY
    // For now, we'll check for part of the year or a known transformation if available.
    // A robust check would require knowing the exact date format in the table.
    const expectedYear = testUnlockDateISO.split('-')[0];
    await expect(createdLockRow).toHaveText(new RegExp(expectedYear));
    
    // Ensure only 1 lock is present (as per this test's flow)
    const lockRows = locksTable.locator('tbody tr');
    await expect(lockRows).toHaveCount(1); 

    console.log('Successfully verified the created lock on the My Locks page.');
  });
});
