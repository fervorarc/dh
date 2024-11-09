// Update the mock rewards in RewardsTable.tsx
const mockRewards: TokenReward[] = [
  {
    id: '1',
    token: { symbol: 'AI', icon: '/logo.png' },
    amount: '5,000',
    expiry: '2024-04-15',
    claimable: true,
    lockId: '1'
  },
  {
    id: '2',
    token: { symbol: 'WETH', icon: '/chains/ethereum.svg' },
    amount: '0.5',
    expiry: '2024-05-01',
    claimable: false,
    lockId: '2'
  },
  {
    id: '3',
    token: { symbol: 'USDC', icon: '/logo.png' },
    amount: '1,000',
    expiry: '2024-04-30',
    claimable: true,
    lockId: '3'
  }
]