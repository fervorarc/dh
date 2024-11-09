'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Holder = {
  rank: number
  address: string
  amount: string
  points: string
  multiplier: string
}

const mockHolders: Holder[] = [
  {
    rank: 1,
    address: '0x1234...5678',
    amount: '10,000,000 MOCHI',
    points: '25,000,000',
    multiplier: '2.5x',
  },
]

export function LeaderboardTable() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl">Leaderboard</h2>
      <div className="p-4 rounded-lg bg-secondary mb-4">
        <p className="text-lg">Your Position: #42</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Rank</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Locked Amount</TableHead>
            <TableHead>Points</TableHead>
            <TableHead>Multiplier</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockHolders.map(holder => (
            <TableRow key={holder.rank}>
              <TableCell>#{holder.rank}</TableCell>
              <TableCell className="font-mono">{holder.address}</TableCell>
              <TableCell>{holder.amount}</TableCell>
              <TableCell>{holder.points}</TableCell>
              <TableCell>{holder.multiplier}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}