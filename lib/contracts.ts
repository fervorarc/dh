import { Address, Hash } from 'viem'

// Contract ABIs
export const DIAMOND_HANDS_LOCKER_ABI = [
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'time', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [{ name: 'lockId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'getLockDetails',
    outputs: [
      { name: 'user', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'releaseTime', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserLocks',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const DIAMOND_HANDS_LOCKER_NFT_ABI = [
  {
    inputs: [
      { name: 'token', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'time', type: 'uint256' }
    ],
    name: 'deposit',
    outputs: [{ name: 'lockId', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'getLockDetails',
    outputs: [
      { name: 'user', type: 'address' },
      { name: 'token', type: 'address' },
      { name: 'tokenId', type: 'uint256' },
      { name: 'releaseTime', type: 'uint256' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ name: 'user', type: 'address' }],
    name: 'getUserLocks',
    outputs: [{ name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function'
  }
] as const

export const DIAMOND_HANDS_FACTORY_ABI = [
  {
    inputs: [
      { name: '_token', type: 'address' },
      { name: '_minLockDuration', type: 'uint256' },
      { name: '_maxLockDuration', type: 'uint256' },
      { name: '_maxMultiplier', type: 'uint256' },
      { name: '_receiptTokenName', type: 'string' },
      { name: '_receiptTokenSymbol', type: 'string' }
    ],
    name: 'createDiamondHandsLinear',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: '_token', type: 'address' },
      { name: '_lockDurations', type: 'uint256[]' },
      { name: '_multipliers', type: 'uint256[]' },
      { name: '_receiptTokenName', type: 'string' },
      { name: '_receiptTokenSymbol', type: 'string' }
    ],
    name: 'createDiamondHandsConstant',
    outputs: [{ name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

export const DIAMOND_HANDS_LINEAR_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'duration', type: 'uint256' }
    ],
    name: 'createLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'rewardToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'duration', type: 'uint256' }
    ],
    name: 'createReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'rewardId', type: 'uint256' },
      { name: 'lockId', type: 'uint256' }
    ],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

export const DIAMOND_HANDS_CONSTANT_ABI = [
  {
    inputs: [
      { name: 'amount', type: 'uint256' },
      { name: 'durationIndex', type: 'uint256' }
    ],
    name: 'createLock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ name: 'lockId', type: 'uint256' }],
    name: 'unlock',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'rewardToken', type: 'address' },
      { name: 'amount', type: 'uint256' },
      { name: 'duration', type: 'uint256' }
    ],
    name: 'createReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { name: 'rewardId', type: 'uint256' },
      { name: 'lockId', type: 'uint256' }
    ],
    name: 'claimReward',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  }
] as const

// Contract addresses per chain
export const CONTRACT_ADDRESSES: {
  [chainId: number]: {
    factory: Address
    tokenLocker: Address
    nftLocker: Address
  }
} = {
  1: {
    factory: '0x...' as Address,
    tokenLocker: '0x...' as Address,
    nftLocker: '0x...' as Address
  },
  // Add other chain IDs and addresses
}