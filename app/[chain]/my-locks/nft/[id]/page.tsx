import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NFTLockDetailsClient } from './components/nft-lock-details-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  const chains = ['eth', 'bsc', 'matic', 'avax', 'arb']
  const lockIds = ['1', '2']
  
  return chains.flatMap(chain => 
    lockIds.map(id => ({
      chain,
      id,
    }))
  )
}

export default function NFTLockDetailsPage({
  params,
}: {
  params: { chain: string; id: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/${params.chain}/my-locks`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-4xl tracking-widest">NFT Lock Details</h1>
      </div>

      <NFTLockDetailsClient lockId={params.id} />
    </main>
  )
}