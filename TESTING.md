# End-to-End Testing with Playwright

This document provides an overview of the end-to-end (E2E) testing setup using Playwright for this project, instructions on how to run the tests, and descriptions of the existing test suites.

## Overview

We use [Playwright](https://playwright.dev/) as our E2E testing framework. Playwright allows us to test our application in real browser environments (Chromium, Firefox, WebKit) and simulate user interactions to verify application functionality from the user's perspective.

## Installation

1.  **Clone the repository** (if you haven't already).
2.  **Install project dependencies**, including Playwright test dependencies:
    ```bash
    npm install
    # or
    npm ci
    ```
    This command installs all dependencies listed in `package.json`, including `@playwright/test`.
3.  **Install Playwright browsers**:
    The first time you install Playwright, or if you need to update browser versions, you might need to run:
    ```bash
    npx playwright install --with-deps
    ```
    This command downloads the browser binaries necessary for Playwright to run tests. Our initial setup (`npm install --save-dev @playwright/test` followed by `npx playwright install --with-deps`) should have handled this.

## Running Tests

To execute the entire suite of Playwright E2E tests, run the following command:

```bash
npx playwright test
```

This command will typically run the tests in headless mode across the browsers specified in `playwright.config.ts`.

**Common Playwright CLI options:**

*   **Run in a specific browser:** `npx playwright test --browser=chromium`
*   **Run in headed mode (to watch the tests execute):** `npx playwright test --headed`
*   **Run a specific test file:** `npx playwright test tests/example.spec.ts`
*   **Run tests in debug mode:** `npx playwright test --debug` (provides a Playwright Inspector for stepping through tests)
*   **View HTML report after a run:** `npx playwright show-report`

## Test Suite Descriptions

All test files are located in the `tests/` directory.

*   **`tests/example.spec.ts`**:
    *   A basic sanity check test.
    *   Navigates to the `/eth` page and verifies that the "Connect Wallet" button is visible.

*   **`tests/wallet.spec.ts`**:
    *   Tests the initial wallet connection flow.
    *   Navigates to `/eth`, clicks the "Connect Wallet" button, and asserts that the RainbowKit connection modal becomes visible.

*   **`tests/token-lock.spec.ts`**:
    *   Tests the token locking functionality on the `/eth/lock-tokens` page.
    *   **Mocking**: Uses Playwright's `page.addInitScript()` to inject mocks for the `useTokenLocker` hook. This simulates successful contract calls for locking tokens.
        *   The mock for `createLock` simulates an asynchronous transaction.
        *   It also includes a test for client-side validation (e.g., preventing locking zero amount).
    *   **Assumptions**:
        *   Relies on the application picking up the mocked hooks (a common challenge requiring careful setup or `page.route()` for robust module replacement).
        *   The "Approve" transaction step within the form is assumed to succeed or not block the flow; it's not explicitly mocked in this script (see TODOs in the file).

*   **`tests/view-locks.spec.ts`**:
    *   Tests the end-to-end flow of creating a lock and then viewing it on the "My Locks" page (`/eth/my-locks`).
    *   **Mocking**: Also uses `page.addInitScript()` to mock `useTokenLocker`.
        *   The mocked `createLock` function updates an internal array of locks.
        *   The mocked `userLocks` data is then served from this internal array, allowing the test to verify that a lock "created" (via UI and mocked transaction) in the first part of the test is correctly displayed.
    *   **Assumptions**: Similar to `token-lock.spec.ts` regarding mock adoption and the "Approve" step.

*   **`tests/leaderboard.spec.ts`**:
    *   Tests the leaderboard page functionality (e.g., `/eth/leaderboard/0xMockToken`).
    *   **Static Data**: This test verifies the display of data from the `LeaderboardTable.tsx` component. It was found during development that this component currently uses **internal, static mock data** (`mockHolders` array) rather than fetching data dynamically.
    *   The test asserts that this static data is rendered correctly. If the component is updated to use dynamic data fetching (e.g., via `useAnkrQuery` or another hook) in the future, this test will need to be updated to mock that mechanism.

## Mocking Strategy

Several tests (`token-lock.spec.ts`, `view-locks.spec.ts`) rely on **`page.addInitScript()`** to inject JavaScript code before the page loads. This script sets up global mocks for specific Wagmi hooks (e.g., `useTokenLocker`) by defining functions on the `window` object (e.g., `window.__MOCK_WAGMI__.mockUseTokenLocker`).

**Important Considerations for Mocking:**

*   **Effectiveness**: For these mocks to be effective, the application's code would ideally need to be structured to recognize and use these global mocks in a testing environment. Without this, `page.route()` might be necessary to intercept and modify the JavaScript modules for these hooks to force the use of the mocks. This aspect is noted with TODO comments in the relevant test files.
*   **Approve Calls**: The "Approve" button functionality in the token locking form is not comprehensively mocked across all tests. If these become blocking points (e.g., due to unmocked contract calls failing in CI), they will need to be addressed with similar mocking techniques.

## Prerequisites & Configuration

*   **Environment**: These tests are designed to run against a development build of the application (e.g., `npm run dev` or a similar setup). The `baseURL` in `playwright.config.ts` is set to `http://localhost:3000`.
*   **No special environment variables** are required for the current set of tests, as they rely on mocking for backend interactions.
*   The `playwright.config.ts` file contains settings for browsers, timeouts, and reporter options (e.g., generating an HTML report). Tracing is typically enabled `on-first-retry` which is very helpful for debugging failed test runs.

---

This document should serve as a good starting point for understanding and running the E2E tests. Remember to consult the Playwright documentation for more advanced features and troubleshooting.
