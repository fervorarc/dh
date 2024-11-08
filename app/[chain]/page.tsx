import { Button } from '@/components/ui/button'
import { CreateLeaderboard } from '@/components/CreateLeaderboard'

import { Leaderboard } from './components/leaderboard'

export default function Dashboard() {
  return (
    <main className="max-w-screen-xl mx-auto flex flex-col gap-4 p-4">
      <section className="">
        <h1 className="text-4xl tracking-widest mb-4">Diamond Hands</h1>
        <p className="max-w-[500px]">
          Lock tokens and let the Diamond Hands app be the trusty leash that
          keeps your tokens safe and sound. It's like a digital doghouse for
          your tokens, but with a lot more treats!
        </p>
      </section>
      <Leaderboard />
      <section className="flex gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-lg">Project Owners</h3>
          <CreateLeaderboard />
          <Button>Erc721 {'->'} DN404</Button>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-lg">Regular Lockers</h3>
          <Button>Lock Tokens</Button>
          <Button>Lock NFTs</Button>
          <Button>My Locks</Button>
        </div>
      </section>
    </main>
  )
}
