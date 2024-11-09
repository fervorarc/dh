import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CreateLeaderboardClient } from './components/create-leaderboard-client'

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

export default function CreateLeaderboardPage({
  params,
}: {
  params: { chain: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto p-4">
      <div className="flex items-center gap-4 mb-8">
        <Button asChild variant="ghost" size="icon">
          <Link href={`/${params.chain}`}>
            <ArrowLeft className="h-6 w-6" />
          </Link>
        </Button>
        <h1 className="text-4xl tracking-widest">Create Leaderboard</h1>
      </div>

      <CreateLeaderboardClient chain={params.chain} />
    </main>
  )
}