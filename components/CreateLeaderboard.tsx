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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

type TimePeriod = {
  id: string
  period: string
  multiplier: string
}

export function CreateLeaderboard() {
  const [timePeriods, setTimePeriods] = useState<TimePeriod[]>([])
  const [linearConfig, setLinearConfig] = useState({
    minTime: '',
    maxTime: '',
    maxMultiplier: '',
  })

  const addTimePeriod = () => {
    setTimePeriods([
      ...timePeriods,
      { id: crypto.randomUUID(), period: '', multiplier: '' },
    ])
  }

  const updateTimePeriod = (id: string, field: keyof TimePeriod, value: string) => {
    setTimePeriods(
      timePeriods.map(period =>
        period.id === id ? { ...period, [field]: value } : period
      )
    )
  }

  const removeTimePeriod = (id: string) => {
    setTimePeriods(timePeriods.filter(period => period.id !== id))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Create Leaderboard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Token Leaderboard</DialogTitle>
          <DialogDescription>
            Configure your token leaderboard settings and rewards.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Token Logo
            </Label>
            <Input id="logo" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Token Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Token Symbol
            </Label>
            <Input id="symbol" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Token Address
            </Label>
            <Input id="address" className="col-span-3" />
          </div>
        </div>
        <div>
          <Tabs defaultValue="constant" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="constant">Constant</TabsTrigger>
              <TabsTrigger value="linear">Linear</TabsTrigger>
            </TabsList>
            <TabsContent value="constant" className="space-y-4">
              <div className="space-y-4">
                {timePeriods.map(period => (
                  <div key={period.id} className="flex gap-4 items-center">
                    <div className="flex-1">
                      <Label>Time Period</Label>
                      <select
                        className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
                        value={period.period}
                        onChange={e => updateTimePeriod(period.id, 'period', e.target.value)}>
                        <option value="">Select period...</option>
                        <option value="1w">1 Week</option>
                        <option value="1m">1 Month</option>
                        <option value="3m">3 Months</option>
                        <option value="6m">6 Months</option>
                        <option value="1y">1 Year</option>
                        <option value="2y">2 Years</option>
                        <option value="5y">5 Years</option>
                      </select>
                    </div>
                    <div className="flex-1">
                      <Label>Multiplier</Label>
                      <Input
                        type="number"
                        min="1"
                        step="0.1"
                        value={period.multiplier}
                        onChange={e => updateTimePeriod(period.id, 'multiplier', e.target.value)}
                        placeholder="Enter multiplier > 1"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="mt-6"
                      onClick={() => removeTimePeriod(period.id)}>
                      ✕
                    </Button>
                  </div>
                ))}
                <Button onClick={addTimePeriod} className="w-full">
                  Add Time Period
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="linear" className="space-y-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Minimum Time (days)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={linearConfig.minTime}
                      onChange={e => setLinearConfig({ ...linearConfig, minTime: e.target.value })}
                      placeholder="Min time in days"
                    />
                  </div>
                  <div>
                    <Label>Maximum Time (days)</Label>
                    <Input
                      type="number"
                      min="1"
                      value={linearConfig.maxTime}
                      onChange={e => setLinearConfig({ ...linearConfig, maxTime: e.target.value })}
                      placeholder="Max time in days"
                    />
                  </div>
                </div>
                <div>
                  <Label>Maximum Multiplier</Label>
                  <Input
                    type="number"
                    min="1"
                    step="0.1"
                    value={linearConfig.maxMultiplier}
                    onChange={e => setLinearConfig({ ...linearConfig, maxMultiplier: e.target.value })}
                    placeholder="Enter max multiplier > 1"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button type="submit">Create Leaderboard</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}