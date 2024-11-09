'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Period = {
  duration: string
  multiplier: number
}

type LinearConfig = {
  minDuration: number
  maxDuration: number
  maxMultiplier: number
}

type Config = {
  type: 'constant' | 'linear'
  periods?: Period[]
  linear?: LinearConfig
}

interface TokenLockFormProps {
  config: Config
}

export function TokenLockForm({ config }: TokenLockFormProps) {
  const [step, setStep] = useState<'approve' | 'lock'>('approve')
  const [tokenAddress, setTokenAddress] = useState('')
  const [amount, setAmount] = useState('')
  const [selectedPeriod, setSelectedPeriod] = useState('')
  const [unlockDate, setUnlockDate] = useState('')

  const handleApprove = async () => {
    // Implement token approval logic here
    setStep('lock')
  }

  const handleLock = async () => {
    // Implement token locking logic here
  }

  // Calculate minimum and maximum dates for linear lock
  const getDateConstraints = () => {
    if (config.type === 'linear' && config.linear) {
      const today = new Date()
      const minDate = new Date(today.getTime() + config.linear.minDuration * 24 * 60 * 60 * 1000)
      const maxDate = new Date(today.getTime() + config.linear.maxDuration * 24 * 60 * 60 * 1000)
      return {
        min: minDate.toISOString().split('T')[0],
        max: maxDate.toISOString().split('T')[0],
      }
    }
    return { min: '', max: '' }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Lock Tokens</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Lock Tokens</DialogTitle>
          <DialogDescription>
            Lock your tokens to earn rewards. The longer you lock, the higher your multiplier.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
          {config.type === 'constant' && config.periods ? (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="period" className="text-right">
                Lock Period
              </Label>
              <select
                id="period"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="col-span-3 h-10 rounded-md border border-input bg-background px-3 py-2">
                <option value="">Select period...</option>
                {config.periods.map((period) => (
                  <option key={period.duration} value={period.duration}>
                    {period.duration} ({period.multiplier}x)
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unlockDate" className="text-right">
                Unlock Date
              </Label>
              <Input
                id="unlockDate"
                type="date"
                value={unlockDate}
                onChange={(e) => setUnlockDate(e.target.value)}
                min={getDateConstraints().min}
                max={getDateConstraints().max}
                className="col-span-3"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          {step === 'approve' ? (
            <Button onClick={handleApprove}>Approve</Button>
          ) : (
            <Button onClick={handleLock}>Lock Tokens</Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}