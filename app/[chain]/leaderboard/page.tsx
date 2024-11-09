import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LeaderboardClient } from './components/leaderboard-client'

export const dynamic = 'force-static'

export function generateStaticParams() {
  return [
    { chain: 'eth' },
    { chain: 'bsc' },
    { chain: 'matic' },
    { chain: 'avax' },
    { chain: 'arb' },
    { chain: 'base' },
    { chain: 'ftm' },
    { chain: 'op' },
    { chain: 'mnt' },
    { chain: 'glmr' },
    { chain: 'fil' },
    { chain: 'celo' },
    { chain: 'kava' },
    { chain: 'scroll' },
    { chain: 'linea' },
    { chain: 'blast' },
    { chain: 'frax' },
  ]
}

export default function LeaderboardPage({
  params,
}: {
  params: { chain: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto p-4 space-y-8">
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/${params.chain}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <div className="flex-1 flex justify-between items-center">
          <div>
            <h1 className="text-4xl tracking-widest mb-2">Diamond Hands</h1>
            <div className="space-x-2">
              <span className="text-muted-foreground">Token:</span>
              <span className="font-mono">Mochi (MOCHI)</span>
            </div>
          </div>
        </div>
      </div>

      <LeaderboardClient />
    </main>
  )
}