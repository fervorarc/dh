'use client'

import { TokenLockForm } from '@/components/TokenLock/TokenLockForm'
import { CreateReward } from '@/components/Rewards/CreateReward'
import { ActiveLocks } from './ActiveLocks'
import { RewardsTable } from './RewardsTable'
import { LeaderboardTable } from './LeaderboardTable'
import { TokenStats } from './TokenStats'
import { LockConfiguration } from './LockConfiguration'

const mockConfig = {
  type: 'constant' as const,
  periods: [
    { duration: '1 week', multiplier: 1 },
    { duration: '1 month', multiplier: 1.5 },
    { duration: '3 months', multiplier: 2 },
    { duration: '6 months', multiplier: 3 },
    { duration: '1 year', multiplier: 4 },
    { duration: '2 years', multiplier: 5 },
  ],
  linear: {
    minDuration: 7,
    maxDuration: 730,
    maxMultiplier: 5,
  },
}

interface TokenLeaderboardClientProps {
  chain: string
  token: string
}

export function TokenLeaderboardClient({ chain, token }: TokenLeaderboardClientProps) {
  return (
    <>
      <div className="space-x-4">
        <TokenLockForm config={mockConfig} />
        <CreateReward />
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <LockConfiguration config={mockConfig} />
        <TokenStats />
      </section>

      <ActiveLocks />
      
      <RewardsTable />
      
      <LeaderboardTable />
    </>
  )
}