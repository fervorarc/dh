'use client'

import '@rainbow-me/rainbowkit/styles.css'

import Image from 'next/image'
import Link from 'next/link'
import { useChain } from '@/hooks'
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount, useChainId } from 'wagmi'
import { Button } from './ui/button'

const getChainLogo = (chainId: number) => {
  switch (chainId) {
    case 1: return '/chains/ethereum.svg'
    case 56: return '/chains/bsc.svg'
    case 137: return '/chains/polygon.svg'
    case 43114: return '/chains/avalanche.svg'
    case 42161: return '/chains/arbitrum.svg'
    case 8453: return '/chains/base.svg'
    case 250: return '/chains/fantom.svg'
    case 10: return '/chains/optimism.svg'
    case 5000: return '/chains/mantle.svg'
    case 1284: return '/chains/moonbeam.svg'
    case 314: return '/chains/filecoin.svg'
    case 42220: return '/chains/celo.svg'
    case 2222: return '/chains/kava.svg'
    case 534352: return '/chains/scroll.svg'
    case 59144: return '/chains/linea.svg'
    case 81457: return '/chains/blast.svg'
    case 252: return '/chains/frax.svg'
    default: return '/logo.png'
  }
}

export default function Header() {
  const { isConnected } = useAccount()
  const { openChainModal } = useChainModal()
  const chainId = useChainId()

  return (
    <header className="h-20 bg-black/20 backdrop-blur-sm border-b border-blue-500/20 p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="relative w-10 h-10">
            <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="/logo.png" 
                alt="Any Inu"
                width={32}
                height={32}
                className="animate-float z-10"
                priority
                unoptimized
              />
            </div>
          </Link>
          <span className="text-xl text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="w-[50px] h-[50px] border border-blue-500/20 glow"
            disabled={!isConnected}
            onClick={openChainModal}>
            <Image
              src={getChainLogo(chainId)}
              alt={chainId.toString()}
              width={35}
              height={35}
              className="rounded-full"
              priority
              unoptimized
            />
          </Button>
          <span className="text-xl text-blue-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6">
              <path
                fillRule="evenodd"
                d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div className="animate-float text-4xl">💎 🙌</div>
        </div>

        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const connected = mounted && account && chain

            return (
              <div
                {...(!mounted && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}>
                {(() => {
                  if (!connected) {
                    return (
                      <Button onClick={openConnectModal} type="button" className="glow">
                        Connect Wallet
                      </Button>
                    )
                  }

                  if (chain.unsupported) {
                    return (
                      <Button onClick={openChainModal} type="button" className="glow">
                        Wrong network
                      </Button>
                    )
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Button 
                        onClick={openAccountModal} 
                        type="button"
                        className="glow sci-fi-border">
                        {account.displayName}
                      </Button>
                    </div>
                  )
                })()}
              </div>
            )
          }}
        </ConnectButton.Custom>
      </div>
    </header>
  )
}