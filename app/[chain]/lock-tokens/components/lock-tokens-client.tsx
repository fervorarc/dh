'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function LockTokensClient() {
  const [step, setStep] = useState<'approve' | 'lock'>('approve')
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [unlockDate, setUnlockDate] = useState('')

  const handleApprove = async () => {
    // Implement token approval logic here
    setStep('lock')
  }

  const handleLock = async () => {
    // Implement token locking logic here
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div className="grid gap-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="tokenAddress" className="text-right">
            Token Address
          </Label>
          <Input
            id="tokenAddress"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="amount" className="text-right">
            Amount
          </Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="col-span-3"
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="unlockDate" className="text-right">
            Unlock Date
          </Label>
          <Input
            id="unlockDate"
            type="date"
            value={unlockDate}
            onChange={(e) => setUnlockDate(e.target.value)}
            className="col-span-3"
          />
        </div>
      </div>

      <div className="flex justify-end">
        {step === 'approve' ? (
          <Button onClick={handleApprove}>Approve</Button>
        ) : (
          <Button onClick={handleLock}>Lock Tokens</Button>
        )}
      </div>
    </div>
  )
}