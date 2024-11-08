'use client'

import { useEffect } from 'react'
import { redirect, usePathname } from 'next/navigation'

import { useChain } from '@/hooks'
import { useAccount } from 'wagmi'

import Header from '@/components/Header'

const convertURL = (chain: string, path: string) => {
  let token = '/eth'

  if (chain === 'BNB Smart Chain') token = '/bsc'
  else if (chain === 'Polygon') token = '/matic'
  else if (chain === 'Avalanche') token = '/avax'
  else if (chain === 'Arbitrum One') token = '/arb'
  else if (chain === 'Base') token = '/base'
  else if (chain === 'Fantom') token = '/ftm'
  else if (chain === 'OP Mainnet') token = '/op'
  else if (chain === 'Mantle') token = '/mnt'
  else if (chain === 'Moonbeam') token = '/glmr'
  else if (chain === 'Filecoin Mainnet') token = '/fil'
  else if (chain === 'Celo') token = '/celo'
  else if (chain === 'Kava EVM') token = '/kava'
  else if (chain === 'Scroll') token = '/scroll'
  else if (chain === 'Linea Mainnet') token = '/linea'
  else if (chain === 'Blast') token = '/blast'
  else if (chain === 'Fraxtal') token = '/frax'

  return path.replace(
    /(\/eth|\/bsc|\/matic|\/avax|\/arb|\/base|\/ftm|\/op|\/mnt|\/glmr|\/fil|\/celo|\/kava|\/scroll|\/linea|\/blast|\/frax)/,
    token
  )
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { chain: blockchain, isConnected } = useAccount()
  const pathname = usePathname()
  const [chain, setChain] = useChain()

  useEffect(() => {
    if (isConnected && blockchain) {
      if (chain !== blockchain.name) {
        setChain(blockchain.name)
      }
    }
    const redirectURL = convertURL(chain, pathname)
    if (pathname !== redirectURL) {
      redirect(redirectURL)
    }
  }, [blockchain, chain, setChain, pathname, isConnected])

  return (
    <>
      <Header />
      {children}
    </>
  )
}
