import { test, expect } from '@playwright/test';

test.describe('Token Locking Flow', () => {
  // Note: The TokenLockForm takes a 'config' prop which determines if it shows
  // a 'period' select or an 'unlockDate' input. These tests assume a configuration
  // that results in the 'unlockDate' input being present (e.g., config.type === 'linear').
  // Adjust tests if the default or specific page config uses 'constant' periods.

  const navigateAndOpenDialog = async (page: any) => {
    // This script will be evaluated in the page context before any page scripts run.
    // It attempts to mock parts of the wagmi hooks, specifically useContractWrite
    // as it's used by useTokenLocker.
    await page.addInitScript(() => {
      console.log('Playwright: Running addInitScript to mock wagmi hooks...');
    
      const mockWriteAsync = async () => {
        console.log('Playwright: Mocked writeAsync called');
        // Simulate a successful transaction hash
        return { hash: '0xmocktxhash_from_playwright_init_script' };
      };

      const mockUseContractWrite = () => {
        // This is a simplified mock. A real scenario might need more properties.
        // It needs to cover what useTokenLocker's useContractWrite expects.
        // Based on useTokenLocker, it returns: data, write, isLoading.
        // 'write' is the function to call, 'data' is the result of write, 'isLoading' is the loading state.
        // We'll also add isSuccess to simulate a completed successful transaction.
        let isLoading = false;
        let isSuccess = false;
        let data = null;

        const write = (args?: any) => {
          console.log('Playwright: Mocked write function (from useContractWrite mock) called with args:', args);
          isLoading = true;
          // Simulate async operation
          setTimeout(() => {
            data = { hash: '0xmocktxhash_success' };
            isSuccess = true;
            isLoading = false;
            console.log('Playwright: Mocked write operation completed.');
            // Potentially, call a global callback or dispatch an event if the app listens for it
            // For now, components relying on this hook would re-render due to state changes if using these vars.
          }, 500); // Short delay to simulate network
        };
        
        // For wagmi v1+ (viem), `write` is the sync function to prepare, and `writeAsync` is what gets called.
        // However, useTokenLocker uses `write` directly. So we provide `write` which internally handles state.

        return {
          data, // Stores the result of the write (e.g., transaction hash)
          isLoading,
          isSuccess, // To indicate the transaction was "successful"
          write, // The function to initiate the transaction
          // writeAsync: mockWriteAsync, // if the hook used writeAsync
          // error: null, isError: false, isIdle: false, reset: () => {}, status: 'success' // other common wagmi states
        };
      };

      // Store this on the window for the application to potentially pick up,
      // OR intercept module loading if Playwright allows.
      // For now, we assume the hook might be globally replaceable or we can modify its source via routing.
      // A more robust way is to use page.route to replace the hook's module code.
      (window as any).__MOCK_WAGMI__ = {
        useContractWrite: mockUseContractWrite,
        // We need to mock useTokenLocker to use our mocked useContractWrite.
        // The ideal scenario is that the component `TokenLockForm` imports `useTokenLocker`,
        // and `useTokenLocker` imports `useContractWrite`.
        // If we can't directly replace `useContractWrite` for `useTokenLocker` before it's initialized,
        // we might need to mock `useTokenLocker` entirely.

        // Mocking useTokenLocker directly:
        mockUseTokenLocker: () => {
          console.log('Playwright: mockUseTokenLocker called');
          // This should return what the actual useTokenLocker returns,
          // but with createLock using a mocked write.
          let createLockLoading = false;
          let createLockSuccess = false;
          let createLockData: { hash: string } | null = null;
          
          const createLockFn = (args?: any) => {
            console.log('Playwright: Mocked createLockFn (from mockUseTokenLocker) called with args:', args);
            createLockLoading = true;
            createLockSuccess = false;
            createLockData = null;
            
            setTimeout(() => {
              console.log('Playwright: Mocked createLockFn operation completing...');
              createLockData = { hash: '0xmockedlocktxhash123' };
              createLockSuccess = true;
              createLockLoading = false;
               // After "success", the UI should update. The dialog might close, or a success message appear.
            }, 500);
          };

          return {
            createLock: createLockFn,
            withdraw: () => console.log('Playwright: Mocked withdraw called (not implemented for this test)'),
            userLocks: [], // Default to no locks
            isCreatingLock: createLockLoading, //This needs to be reactive. The initScript is static.
            isWithdrawing: false,
            // To make isCreatingLock reactive, the test would need to call a function on the window to update this state,
            // or the mock needs to be more sophisticated (e.g. an actual small state machine).
            // For now, we'll rely on the fact that `createLockFn` simulates the async nature,
            // and components might re-render based on `isSuccess` if that's how they are built.
            // A better mock would involve making `isCreatingLock` and `createLockSuccess` part of a returned object
            // whose properties can be dynamically updated by the `createLockFn` and read by the test.
            // This basic initScript mock won't have true reactivity for `isCreatingLock` reflected in the hook's return value
            // *outside* the `createLockFn`'s execution unless the app re-calls `useTokenLocker`.
            // Let's assume isCreatingLock is used to disable button, and isSuccess for success message.
            // We'll refine this if needed. The key is `createLockSuccess` for verification.
            
            // To expose success state for verification in test:
             _getCreateLockSuccess: () => createLockSuccess, // Helper for test to check
          };
        }
      };
    });

    await page.goto('/eth/lock-tokens');

    // Attempt to set localStorage to simulate connected wallet for UI purposes
    // Common keys used by wagmi/RainbowKit. This is speculative.
    // The actual key might be different or the app might rely on more complex state.
    await page.evaluate(() => {
      localStorage.setItem('wagmi.connected', 'true');
      localStorage.setItem('rk-recent', 'true'); // Example for RainbowKit
    });
    
    // Re-navigate or reload for localStorage changes to potentially take effect on UI
    await page.reload();

    // The TokenLockForm is typically within a Dialog, triggered by a button.
    // First, click the button that opens the dialog.
    // The button text might change if the wallet is perceived as connected.
    // Looking for "Lock Tokens" or "Manage Locks" or similar.
    const dialogTriggerButton = page.locator('button:has-text("Lock Tokens"), button:has-text("Create Lock")').first(); // Main page button
    await expect(dialogTriggerButton).toBeVisible({ timeout: 10000 });
    await dialogTriggerButton.click();

    // Wait for the dialog to be visible
    const dialogContent = page.locator('[role="dialog"].sm\\:max-w-\\[425px\\]'); // Dialog selector
    await expect(dialogContent).toBeVisible({ timeout: 5000 });
    return dialogContent;
  };

  test('should fill the form, click approve, then lock, and show success with mocked transaction', async ({ page }) => {
    // The addInitScript mock for useTokenLocker needs to be active.
    // The application code needs to be modified to use window.__MOCK_WAGMI__.mockUseTokenLocker()
    // if process.env.NODE_ENV === 'test' or similar. This is a common pattern for robust mocking.
    // Without that, this addInitScript will not replace the imported hook.
    // For now, we proceed ASSUMING the mock can be picked up or page.route will be used later.
    // TODO: Confirm how to make the app use the mocked hook from addInitScript.
    // This might involve using page.route() to intercept the request for useTokenLocker.ts
    // and replacing its content with a version that uses the window mock.
    
    // One way to force the mock (if direct import replacement is hard):
    // Modify the hook directly if the test environment allows it.
    // e.g. page.evaluate(() => {
    //   const actualHooks = require('@/hooks/useTokenLocker'); // Or the path to it
    //   actualHooks.useTokenLocker = (window as any).__MOCK_WAGMI__.mockUseTokenLocker;
    // });
    // This is tricky due to ESM vs CJS and when modules are loaded.
    // For now, we'll assume the `addInitScript`'s `mockUseTokenLocker` is somehow used.

    const dialogContent = await navigateAndOpenDialog(page);

    // 3. Form Interaction:
    const tokenAddressInput = dialogContent.locator('input#tokenAddress'); // Inside dialog
    const amountInput = dialogContent.locator('input#amount');
    // Assuming 'linear' config, so 'unlockDate' input is present.
    const unlockDateInput = dialogContent.locator('input#unlockDate');

    await expect(tokenAddressInput).toBeVisible();
    await tokenAddressInput.fill('0xMockTokenAddress1234567890');

    await expect(amountInput).toBeVisible();
    await amountInput.fill('100');

    // For 'linear' config, set an unlock date.
    // Need to calculate a valid date based on potential min/max constraints from the form.
    // For now, let's try a fixed future date. The form's `getDateConstraints` might need mocking or respecting.
    // Defaulting to a date far in the future to likely be valid.
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90); // 90 days in the future
    const dateForInput = futureDate.toISOString().split('T')[0];
    await expect(unlockDateInput).toBeVisible();
    await unlockDateInput.fill(dateForInput);

    // Click Approve button
    const approveButton = dialogContent.locator('button:has-text("Approve")');
    await expect(approveButton).toBeVisible();
    await expect(approveButton).toBeEnabled();
    await approveButton.click();

    // After clicking "Approve", the button should change to "Lock Tokens"
    // This depends on the successful mocking of the approve transaction.
    // IMPORTANT ASSUMPTION: The 'Approve' button click either:
    //    a) Succeeds (if it's also mocked, or in an environment where it can execute).
    //    b) Fails gracefully without preventing the "Lock Tokens" button from appearing/being clickable.
    //    c) Is not strictly necessary for the "Lock Tokens" button to become active if using a token that doesn't need approval or has pre-approval.
    // If the 'Approve' step makes a real, unmocked contract call that fails and blocks UI, this test will fail.
    // The current mock in addInitScript is primarily for useTokenLocker's createLock, not for a generic ERC20 approve.
    // TODO: Implement a mock for the 'Approve' button's underlying contract call if it becomes a blocker.
    const lockButtonInDialog = dialogContent.locator('button:has-text("Lock Tokens")');
    await expect(lockButtonInDialog).toBeVisible({ timeout: 5000 }); // Wait for UI update if Approve changed it
    await expect(lockButtonInDialog).toBeEnabled();
    
    await lockButtonInDialog.click();

    // 5. Verification (Post-Mocked Lock Transaction):
    // Check if the mocked `createLock` was "successful" by checking the flag we exposed in the mock.
    // This requires the mock to be properly stateful and for the page to re-render.
    // A more robust way is to check for UI changes.
    
    // Example: Wait for a success message or dialog to close.
    // This selector needs to match what the application actually shows on success.
    const successMessage = page.locator('text="Tokens locked successfully", text="Lock successful", [data-testid="lock-success-message"]');
    // Or, if the dialog closes on success:
    // await expect(dialogContent).not.toBeVisible({ timeout: 10000 }); // wait up to 10s for it to disappear

    // Let's use a polling mechanism to check the success flag from the mock for demonstration,
    // though UI verification is preferred.
    await page.waitForFunction(async () => {
      return (window as any).__MOCK_WAGMI__?._getCreateLockSuccess?.() === true;
    }, { timeout: 5000 });

    // And then verify UI changes, e.g. dialog closes
    await expect(dialogContent).not.toBeVisible({ timeout: 10000 });
    
    // Alternative: if a toast message appears
    // const toastSuccess = page.locator('[data-testid="toast-success"] :text("Lock created")');
    // await expect(toastSuccess).toBeVisible({timeout: 5000});

    console.log("Mocked lock transaction submitted. Verified success via mock flag and dialog closing.");
  });

  test('should show client-side validation error for zero amount', async ({ page }) => {
    // This test does not involve contract interaction mocks, so it's simpler.
    const dialogContent = await navigateAndOpenDialog(page);

    const tokenAddressInput = dialogContent.locator('input#tokenAddress');
    const amountInput = dialogContent.locator('input#amount');
    const unlockDateInput = dialogContent.locator('input#unlockDate'); // Assuming linear config

    await expect(tokenAddressInput).toBeVisible();
    await tokenAddressInput.fill('0xMockTokenAddressValidFormat'); // Use a valid format

    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 90); // Ensure date is valid
    const dateForInput = futureDate.toISOString().split('T')[0];
    await expect(unlockDateInput).toBeVisible();
    await unlockDateInput.fill(dateForInput);

    await expect(amountInput).toBeVisible();
    await amountInput.fill('0'); // Invalid amount

    // Check HTML5 validation message on the input field itself
    const isInvalid = await amountInput.evaluate((input: HTMLInputElement) => !input.validity.valid);
    expect(isInvalid).toBe(true);
    
    const validationMessage = await amountInput.evaluate((input: HTMLInputElement) => input.validationMessage);
    // Default browser messages can vary. Common ones are "Value must be greater than 0." or similar for min="0.000001" or min="1"
    // Or "Please enter a valid value." if steps are mismatched.
    // We are checking if *a* validation message is present.
    expect(validationMessage).not.toBe(''); 
    console.log(`Input validation message for zero amount: "${validationMessage}"`);


    // The "Approve" button might be disabled or clicking it might not proceed if the form is invalid.
    const approveButton = dialogContent.locator('button:has-text("Approve")');
    await expect(approveButton).toBeVisible();

    // Check if the button is disabled due to client-side validation (common pattern)
    // This depends on how the form is implemented. It might not be disabled but prevent action on click.
    const isApproveButtonDisabled = await approveButton.isDisabled();
    if (isApproveButtonDisabled) {
      console.log("Approve button is disabled for zero amount, as expected by some form validation patterns.");
    } else {
      console.log("Approve button is NOT disabled for zero amount. Test will rely on input validation message or behavior on click.");
      // Optionally, click and expect no state change or an error toast if not handled by input validation alone.
      // await approveButton.click();
      // await expect(dialogContent.locator('text="Transaction pending"')).not.toBeVisible(); // Example
    }
    
    // For this test, confirming the input field's own validation state is a good primary check.
    // If the button *were* to be clicked and it *did* proceed, that would be a separate bug.
  });
});
  });
});
