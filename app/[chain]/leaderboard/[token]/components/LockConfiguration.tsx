'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

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

export function LockConfiguration({ config }: { config: Config }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Lock Configuration</h2>
      <div className="p-4 rounded-lg bg-secondary">
        <h3 className="font-semibold mb-4">
          {config.type === 'constant' ? 'Fixed Duration Multipliers' : 'Linear Multiplier System'}
        </h3>

        {config.type === 'constant' && config.periods && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lock Duration</TableHead>
                <TableHead>Multiplier</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {config.periods.map((period) => (
                <TableRow key={period.duration}>
                  <TableCell>{period.duration}</TableCell>
                  <TableCell>{period.multiplier}x</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {config.type === 'linear' && config.linear && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Minimum Duration</p>
                <p className="text-lg font-semibold">{config.linear.minDuration} days</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Maximum Duration</p>
                <p className="text-lg font-semibold">{config.linear.maxDuration} days</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Maximum Multiplier</p>
              <p className="text-lg font-semibold">{config.linear.maxMultiplier}x</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              The multiplier increases linearly from 1x to {config.linear.maxMultiplier}x 
              between {config.linear.minDuration} and {config.linear.maxDuration} days.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}