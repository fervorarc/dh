import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getExplorerUrl(chain: string, address: string, type: 'token' | 'address' | 'tx' = 'token') {
  const explorers: Record<string, string> = {
    eth: 'https://etherscan.io',
    bsc: 'https://bscscan.com',
    matic: 'https://polygonscan.com',
    avax: 'https://snowtrace.io',
    arb: 'https://arbiscan.io',
    base: 'https://basescan.org',
    ftm: 'https://ftmscan.com',
    op: 'https://optimistic.etherscan.io',
    mnt: 'https://explorer.mantle.xyz',
    glmr: 'https://moonscan.io',
    fil: 'https://filfox.info/en',
    celo: 'https://celoscan.io',
    kava: 'https://explorer.kava.io',
    scroll: 'https://scrollscan.com',
    linea: 'https://lineascan.build',
    blast: 'https://blastscan.io',
    frax: 'https://fraxscan.com',
  }

  const baseUrl = explorers[chain] || explorers.eth
  const path = type === 'tx' ? 'tx' : 'token'
  return `${baseUrl}/${path}/${address}`
}