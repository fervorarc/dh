'use client'

import '@rainbow-me/rainbowkit/styles.css'

import Image from 'next/image'

import { useChain } from '@/hooks'
import { ConnectButton, useChainModal } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi'

import { Button } from './ui/button'

const getChainLogo = (chain: string) => {
  if (chain === 'Ethereum') return '/chains/ethereum.svg'
  else if (chain === 'BNB Smart Chain') return '/chains/bsc.svg'
  else if (chain === 'Polygon') return '/chains/polygon.svg'
  else if (chain === 'Avalanche') return '/chains/avalanche.svg'
  else if (chain === 'Arbitrum One') return '/chains/arbitrum.svg'
  else if (chain === 'Base') return '/chains/base.svg'
  else if (chain === 'Fantom') return '/chains/fantom.svg'
  else if (chain === 'OP Mainnet') return '/chains/optimism.svg'
  else if (chain === 'Mantle') return '/chains/mantle.svg'
  else if (chain === 'Moonbeam') return '/chains/moonbeam.svg'
  else if (chain === 'Filecoin Mainnet') return '/chains/filecoin.svg'
  else if (chain === 'Celo') return '/chains/celo.svg'
  else if (chain === 'Kava EVM') return '/chains/kava.svg'
  else if (chain === 'Scroll') return '/chains/scroll.svg'
  else if (chain === 'Linea Mainnet') return '/chains/linea.svg'
  else if (chain === 'Blast') return '/chains/blast.svg'
  else if (chain === 'Fraxtal') return '/chains/frax.svg'
  return '/logo.png'
}

export default function Header() {
  const { isConnected } = useAccount()
  const { openChainModal } = useChainModal()

  const [chain] = useChain()

  console.log(chain)

  return (
    <header className="h-20 bg-white/10 p-4">
      <div className="max-w-screen-xl mx-auto flex  items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="AnyInu" width={40} height={40} />
          <span className="text-xl">
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
            className="w-[50px] h-[50px] border border-white/20"
            disabled={!isConnected}
            onClick={openChainModal}>
            <Image
              src={getChainLogo(chain)}
              alt={chain}
              width={35}
              height={35}
              className="rounded-full"
            />
          </Button>
          <span className="text-xl">
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
          <div className="animate-shake text-4xl">💎 🙌</div>
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
                      <Button onClick={openConnectModal} type="button">
                        Connect Wallet
                      </Button>
                    )
                  }

                  if (chain.unsupported) {
                    return (
                      <button onClick={openChainModal} type="button">
                        Wrong network
                      </button>
                    )
                  }

                  return (
                    <div style={{ display: 'flex', gap: 12 }}>
                      <Button onClick={openAccountModal} type="button">
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
