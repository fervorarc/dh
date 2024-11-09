'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Leaderboard } from './leaderboard'

interface DashboardClientProps {
  chain: string
}

export function DashboardClient({ chain }: DashboardClientProps) {
  return (
    <>
      <section className="grid-bg rounded-lg p-4">
        <Leaderboard chain={chain} />
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="sci-fi-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg text-blue-100">Token Actions</h3>
          <div className="space-y-3">
            <Button asChild className="w-full glow">
              <Link href={`/${chain}/lock-tokens`}>Lock Tokens</Link>
            </Button>
            <Button asChild className="w-full glow">
              <Link href={`/${chain}/lock-nfts`}>Lock NFTs</Link>
            </Button>
            <Button asChild className="w-full glow">
              <Link href={`/${chain}/my-locks`}>My Locks</Link>
            </Button>
          </div>
        </div>

        <div className="sci-fi-border rounded-lg p-6 space-y-4">
          <h3 className="text-lg text-blue-100">DN404 Conversion</h3>
          <p className="text-sm text-blue-100/60 mb-4">
            Convert between ERC721 NFTs and DN404 tokens with our specialized conversion tool.
          </p>
          <Button asChild className="w-full glow">
            <Link href={`/${chain}/dn404`}>Launch DN404 Converter</Link>
          </Button>
        </div>
      </section>
    </>
  )
}