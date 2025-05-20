import { test, expect } from '@playwright/test';

// This data is based on the mockHolders array in LeaderboardTable.tsx
const expectedLeaderboardData = [
  {
    rank: 1,
    address: '0x1234...5678',
    amount: '10,000,000 AI',
    points: '25,000,000',
    multiplier: '2.5x',
  },
  {
    rank: 2,
    address: '0x8765...4321',
    amount: '5,000,000 AI',
    points: '10,000,000',
    multiplier: '2.0x',
  },
  {
    rank: 3,
    address: '0x9876...5432',
    amount: '2,500,000 AI',
    points: '5,000,000',
    multiplier: '2.0x',
  }
];

test.describe('Leaderboard Page', () => {
  test('should display leaderboard with statically mocked data', async ({ page }) => {
    // 1. Navigate to a specific leaderboard page.
    // The token part of the URL might not matter if LeaderboardTable.tsx always uses its internal mock data.
    // Using a placeholder token address.
    await page.goto('/eth/leaderboard/0xMockTokenForLeaderboard');

    // 2. Check that the leaderboard table section is present.
    const leaderboardSection = page.locator('section:has(h2:has-text("Leaderboard"))');
    await expect(leaderboardSection).toBeVisible({ timeout: 10000 });

    const leaderboardTable = leaderboardSection.locator('role=table');
    await expect(leaderboardTable).toBeVisible();

    // 3. Verify table headers
    const headers = ['Rank', 'Address', 'Locked Amount', 'Points', 'Multiplier'];
    for (const header of headers) {
      await expect(leaderboardTable.locator(`th:has-text("${header}")`)).toBeVisible();
    }

    // 4. Verify the content of the table matches the mockHolders data
    const tableRows = leaderboardTable.locator('tbody tr');
    await expect(tableRows).toHaveCount(expectedLeaderboardData.length);

    for (let i = 0; i < expectedLeaderboardData.length; i++) {
      const row = tableRows.nth(i);
      const expectedEntry = expectedLeaderboardData[i];

      // Rank check (ensure it's exactly `#N`)
      const rankCell = row.locator('td').nth(0);
      await expect(rankCell).toHaveText(`#${expectedEntry.rank}`);
      
      // Address check
      const addressCell = row.locator('td').nth(1);
      await expect(addressCell).toHaveText(expectedEntry.address);
      expect(await addressCell.getAttribute('class')).toContain('font-mono'); // As per component

      // Amount check
      const amountCell = row.locator('td').nth(2);
      await expect(amountCell).toHaveText(expectedEntry.amount);

      // Points check
      const pointsCell = row.locator('td').nth(3);
      await expect(pointsCell).toHaveText(expectedEntry.points);
      
      // Multiplier check
      const multiplierCell = row.locator('td').nth(4);
      await expect(multiplierCell).toHaveText(expectedEntry.multiplier);
    }

    // 5. Verify "Your Position" section (also seems static in the component)
    const yourPosition = leaderboardSection.locator('div.p-4.rounded-lg.bg-secondary :text("Your Position: #42")');
    await expect(yourPosition).toBeVisible();

    // Note: If LeaderboardTable.tsx were to fetch data dynamically in the future,
    // this test would need to be updated to mock that data fetching mechanism
    // (e.g., using page.route() for API calls or addInitScript for hooks like useAnkrQuery).
  });
});
