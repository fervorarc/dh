'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import Image from 'next/image'

type Reward = {
  id: string
  token: {
    symbol: string
    icon: string
  }
  amount: string
  expiry: string
  claimable: boolean
}

const ITEMS_PER_PAGE = 10

export function RewardsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [rewards] = useState<Reward[]>([
    {
      id: '1',
      token: { symbol: 'ETH', icon: '/chains/ethereum.svg' },
      amount: '0.5',
      expiry: '2024-12-31',
      claimable: true,
    },
  ])

  const totalPages = Math.ceil(rewards.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedRewards = rewards.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  const handleClaimAll = async () => {
    // Implement claim all logic
  }

  return (
    <section className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl">Active Rewards</h2>
        <Button onClick={handleClaimAll}>Claim All Rewards</Button>
      </div>
      
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Token</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expiry Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedRewards.map(reward => (
            <TableRow key={reward.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Image
                    src={reward.token.icon}
                    alt={reward.token.symbol}
                    width={24}
                    height={24}
                    className="rounded-full"
                  />
                  <span>{reward.token.symbol}</span>
                </div>
              </TableCell>
              <TableCell>{reward.amount}</TableCell>
              <TableCell>{reward.expiry}</TableCell>
              <TableCell>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!reward.claimable}
                  onClick={() => console.log('Claim reward', reward.id)}>
                  {reward.claimable ? 'Claim' : 'Pending'}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
          disabled={currentPage === 1}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </section>
  )
}