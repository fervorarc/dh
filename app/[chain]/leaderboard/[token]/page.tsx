import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { TokenLeaderboardClient } from './components/token-leaderboard-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  const chains = [
    'eth',
    'bsc',
    'matic',
    'avax',
    'arb',
    'base',
    'ftm',
    'op',
    'mnt',
    'glmr',
    'fil',
    'celo',
    'kava',
    'scroll',
    'linea',
    'blast',
    'frax',
  ]
  
  const tokens = ['AI', 'WETH', 'MATIC'] // Add all supported tokens

  return chains.flatMap(chain =>
    tokens.map(token => ({
      chain,
      token,
    }))
  )
}

const getTokenInfo = (token: string) => {
  switch (token) {
    case 'AI':
      return {
        name: 'Any Inu',
        address: '0x2598c30330D5771AE9F983979209486aE26dE875',
        logo: '/logo.png'
      }
    case 'WETH':
      return {
        name: 'Wrapped Ether',
        address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        logo: '/chains/ethereum.svg'
      }
    case 'MATIC':
      return {
        name: 'Polygon',
        address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
        logo: '/chains/polygon.svg'
      }
    default:
      return {
        name: token,
        address: '',
        logo: '/logo.png'
      }
  }
}

export default function TokenLeaderboardPage({
  params,
}: {
  params: { chain: string; token: string }
}) {
  const tokenInfo = getTokenInfo(params.token)
  const explorerUrl = `https://etherscan.io/token/${tokenInfo.address}`

  return (
    <main className="max-w-screen-xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/${params.chain}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <div className="flex-1 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image 
              src={tokenInfo.logo}
              alt={tokenInfo.name}
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h1 className="text-4xl tracking-widest mb-2">{tokenInfo.name}</h1>
              <div className="space-x-2">
                <span className="text-muted-foreground">Token:</span>
                <span className="font-mono">{params.token}</span>
                <span className="text-muted-foreground">Address:</span>
                <Link 
                  href={explorerUrl} 
                  target="_blank" 
                  className="font-mono text-primary hover:underline"
                >
                  {tokenInfo.address}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TokenLeaderboardClient chain={params.chain} token={params.token} />
    </main>
  )
}