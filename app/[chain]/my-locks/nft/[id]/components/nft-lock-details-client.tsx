const mockNFTLockDetails = {
  id: '1',
  name: 'Any Inu #123',
  collection: {
    name: 'Any Inu NFT',
    address: '0x2598c30330D5771AE9F983979209486aE26dE875'
  },
  image: '/logo.png',
  tokenId: '123',
  lockDate: '2024-01-20',
  unlockDate: '2024-06-20',
  canUnlock: false,
  attributes: [
    { trait_type: 'Background', value: 'Blue' },
    { trait_type: 'Body', value: 'Gold' },
    { trait_type: 'Eyes', value: 'Rainbow' }
  ],
  rewards: {
    earned: '5,000',
    pending: '2,500',
    nextClaim: '2024-04-01'
  },
  transactions: [
    {
      hash: '0xabcd...1234',
      type: 'lock',
      date: '2024-01-20',
      details: 'Locked NFT'
    },
    {
      hash: '0xefgh...5678',
      type: 'claim',
      date: '2024-02-20',
      details: 'Claimed 2,500 AI rewards'
    }
  ]
}