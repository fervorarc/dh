import { useCallback } from 'react'
import { Address } from 'viem'
import {
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { DIAMOND_HANDS_FACTORY_ABI, CONTRACT_ADDRESSES } from '@/lib/contracts'

export function useDiamondHandsFactory(chainId: number) {
  const contractAddress = CONTRACT_ADDRESSES[chainId]?.factory

  const {
    data: createLinearData,
    write: createLinear,
    isLoading: isCreatingLinear,
  } = useContractWrite({
    address: contractAddress,
    abi: DIAMOND_HANDS_FACTORY_ABI,
    functionName: 'createDiamondHandsLinear',
  })

  const {
    data: createConstantData,
    write: createConstant,
    isLoading: isCreatingConstant,
  } = useContractWrite({
    address: contractAddress,
    abi: DIAMOND_HANDS_FACTORY_ABI,
    functionName: 'createDiamondHandsConstant',
  })

  return {
    createLinear,
    createConstant,
    isCreatingLinear,
    isCreatingConstant,
  }
}