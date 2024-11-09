import { Address } from 'viem'

const ANKR_API_KEY = process.env.NEXT_PUBLIC_ANKR_API_KEY || ''
const ANKR_API_ENDPOINT = 'https://rpc.ankr.com/multichain'

export type TokenBalance = {
  contractAddress: string
  tokenName: string
  symbol: string
  thumbnail: string
  balance: string
  balanceRawInteger: string
  balanceUsd: string
  tokenType: string
  decimals: number
}

export type NFTBalance = {
  contractAddress: string
  collectionName: string
  name: string
  thumbnail: string
  tokenId: string
  tokenUrl: string
  tokenType: string
}

export async function getTokenBalances(walletAddress: Address, blockchain?: string) {
  const response = await fetch(ANKR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': ANKR_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'ankr_getAccountBalance',
      params: {
        walletAddress,
        blockchain,
      },
      id: 1,
    }),
  })

  const data = await response.json()
  return data.result?.assets || []
}

export async function getNFTBalances(walletAddress: Address, blockchain?: string) {
  const response = await fetch(ANKR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': ANKR_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'ankr_getNFTsByOwner',
      params: {
        walletAddress,
        blockchain,
      },
      id: 1,
    }),
  })

  const data = await response.json()
  return data.result?.assets || []
}

export async function getTokenHolders(
  contractAddress: Address,
  blockchain: string,
  page = 1,
  pageSize = 100
) {
  const response = await fetch(ANKR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': ANKR_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'ankr_getTokenHolders',
      params: {
        blockchain,
        contractAddress,
        pageSize,
        pageNumber: page,
      },
      id: 1,
    }),
  })

  const data = await response.json()
  return {
    holders: data.result?.holders || [],
    totalPages: Math.ceil((data.result?.totalCount || 0) / pageSize),
  }
}

export async function getNFTHolders(
  contractAddress: Address,
  blockchain: string,
  page = 1,
  pageSize = 100
) {
  const response = await fetch(ANKR_API_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': ANKR_API_KEY,
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'ankr_getNFTHolders',
      params: {
        blockchain,
        contractAddress,
        pageSize,
        pageNumber: page,
      },
      id: 1,
    }),
  })

  const data = await response.json()
  return {
    holders: data.result?.holders || [],
    totalPages: Math.ceil((data.result?.totalCount || 0) / pageSize),
  }
}