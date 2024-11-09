import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount } from 'wagmi'
import {
  getTokenBalances,
  getNFTBalances,
  getTokenHolders,
  getNFTHolders,
  TokenBalance,
  NFTBalance,
} from '@/lib/ankr'

export function useTokenBalances(blockchain?: string) {
  const { address } = useAccount()
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!address) return

    const fetchBalances = async () => {
      try {
        setIsLoading(true)
        const data = await getTokenBalances(address, blockchain)
        setBalances(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch token balances'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalances()
  }, [address, blockchain])

  return { balances, isLoading, error }
}

export function useNFTBalances(blockchain?: string) {
  const { address } = useAccount()
  const [balances, setBalances] = useState<NFTBalance[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (!address) return

    const fetchBalances = async () => {
      try {
        setIsLoading(true)
        const data = await getNFTBalances(address, blockchain)
        setBalances(data)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch NFT balances'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBalances()
  }, [address, blockchain])

  return { balances, isLoading, error }
}

export function useTokenHolders(
  contractAddress: Address,
  blockchain: string,
  page = 1,
  pageSize = 100
) {
  const [holders, setHolders] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        setIsLoading(true)
        const data = await getTokenHolders(contractAddress, blockchain, page, pageSize)
        setHolders(data.holders)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch token holders'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHolders()
  }, [contractAddress, blockchain, page, pageSize])

  return { holders, totalPages, isLoading, error }
}

export function useNFTHolders(
  contractAddress: Address,
  blockchain: string,
  page = 1,
  pageSize = 100
) {
  const [holders, setHolders] = useState<any[]>([])
  const [totalPages, setTotalPages] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchHolders = async () => {
      try {
        setIsLoading(true)
        const data = await getNFTHolders(contractAddress, blockchain, page, pageSize)
        setHolders(data.holders)
        setTotalPages(data.totalPages)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch NFT holders'))
      } finally {
        setIsLoading(false)
      }
    }

    fetchHolders()
  }, [contractAddress, blockchain, page, pageSize])

  return { holders, totalPages, isLoading, error }
}