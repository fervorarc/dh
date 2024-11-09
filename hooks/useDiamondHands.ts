import { useCallback } from 'react'
import { Address } from 'viem'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import {
  DIAMOND_HANDS_LINEAR_ABI,
  DIAMOND_HANDS_CONSTANT_ABI,
} from '@/lib/contracts'

export function useDiamondHands(contractAddress: Address, type: 'linear' | 'constant') {
  const abi = type === 'linear' ? DIAMOND_HANDS_LINEAR_ABI : DIAMOND_HANDS_CONSTANT_ABI

  const {
    data: createLockData,
    write: createLock,
    isLoading: isCreatingLock,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'createLock',
  })

  const {
    data: unlockData,
    write: unlock,
    isLoading: isUnlocking,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'unlock',
  })

  const {
    data: createRewardData,
    write: createReward,
    isLoading: isCreatingReward,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'createReward',
  })

  const {
    data: claimRewardData,
    write: claimReward,
    isLoading: isClaimingReward,
  } = useContractWrite({
    address: contractAddress,
    abi,
    functionName: 'claimReward',
  })

  return {
    createLock,
    unlock,
    createReward,
    claimReward,
    isCreatingLock,
    isUnlocking,
    isCreatingReward,
    isClaimingReward,
  }
}