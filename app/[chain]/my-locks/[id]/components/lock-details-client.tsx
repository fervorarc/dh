'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

interface LockDetailsClientProps {
  id: string
}

export function LockDetailsClient({ id }: LockDetailsClientProps) {
  // Mock data - in real app would fetch from contract
  const [lock] = useState({
    id,
    type: 'token',
    token: 'Any Inu',
    tokenAddress: '0x2598c30330D5771AE9F983979209486aE26dE875',
    amount: '1,000,000',
    multiplier: 2.5,
    lockDate: '2024-01-01',
    unlockDate: '2024-12-31',
    canUnlock: false
  })

  const handleUnlock = async () => {
    // Implement unlock logic
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-2 gap-8">
        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-muted-foreground">Lock Type</h2>
            <p className="text-xl">{lock.type === 'token' ? 'Token Lock' : 'NFT Lock'}</p>
          </div>
          
          <div>
            <h2 className="text-sm text-muted-foreground">Token</h2>
            <Link 
              href={`https://etherscan.io/token/${lock.tokenAddress}`}
              target="_blank"
              className="text-xl text-primary hover:underline"
            >
              {lock.token}
            </Link>
          </div>

          <div>
            <h2 className="text-sm text-muted-foreground">Amount</h2>
            <p className="text-xl">{lock.amount}</p>
          </div>

          <div>
            <h2 className="text-sm text-muted-foreground">Multiplier</h2>
            <p className="text-xl">{lock.multiplier}x</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-sm text-muted-foreground">Lock Date</h2>
            <p className="text-xl">{lock.lockDate}</p>
          </div>

          <div>
            <h2 className="text-sm text-muted-foreground">Unlock Date</h2>
            <p className="text-xl">{lock.unlockDate}</p>
          </div>

          <div>
            <h2 className="text-sm text-muted-foreground">Status</h2>
            <p className="text-xl">{lock.canUnlock ? 'Unlockable' : 'Locked'}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleUnlock}
          disabled={!lock.canUnlock}
        >
          {lock.canUnlock ? 'Unlock' : 'Locked'}
        </Button>
      </div>
    </div>
  )
}