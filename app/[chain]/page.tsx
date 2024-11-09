import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { DashboardClient } from './components/dashboard-client'

export const dynamic = 'force-static'

// Reduce the number of static paths to essential ones
export function generateStaticParams() {
  return [
    { chain: 'eth' },
    { chain: 'bsc' },
    { chain: 'matic' },
    { chain: 'avax' },
    { chain: 'arb' }
  ]
}

export default function Dashboard({
  params,
}: {
  params: { chain: string }
}) {
  return (
    <main className="max-w-screen-xl mx-auto flex flex-col gap-6 p-4">
      <section className="sci-fi-border rounded-lg p-6 animate-float">
        <h1 className="text-4xl tracking-widest mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
          Diamond Hands
        </h1>
        <p className="max-w-[500px] text-blue-100/80">
          Lock tokens and let the Diamond Hands app be the trusty leash that
          keeps your tokens safe and sound. It's like a digital doghouse for
          your tokens, but with a lot more treats!
        </p>
      </section>

      <DashboardClient chain={params.chain} />
    </main>
  )
}