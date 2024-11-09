import { useCallback } from 'react'
import { Address, Hash } from 'viem'
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { DIAMOND_HANDS_LOCKER_ABI, CONTRACT_ADDRESSES } from '@/lib/contracts'

export function useTokenLocker(chainId: number) {
  const contractAddress = CONTRACT_ADDRESSES[chainId]?.tokenLocker

  const {
    data: createLockData,
    write: createLock,
    isLoading: isCreatingLock,
  } = useContractWrite({
    address: contractAddress,
    abi: DIAMOND_HANDS_LOCKER_ABI,
    functionName: 'deposit',
  })

  const {
    data: withdrawData,
    write: withdraw,
    isLoading: isWithdrawing,
  } = useContractWrite({
    address: contractAddress,
    abi: DIAMOND_HANDS_LOCKER_ABI,
    functionName: 'withdraw',
  })

  const { data: userLocks } = useContractRead({
    address: contractAddress,
    abi: DIAMOND_HANDS_LOCKER_ABI,
    functionName: 'getUserLocks',
    watch: true,
  })

  return {
    createLock,
    withdraw,
    userLocks,
    isCreatingLock,
    isWithdrawing,
  }
}