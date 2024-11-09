'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'

type Lock = {
  id: string
  rewardToken: string
  amount: string
  expiration: string
}

const ITEMS_PER_PAGE = 10

const mockLocks: Lock[] = [
  {
    id: '1',
    rewardToken: '0x1234...5678',
    amount: '1,000,000 AI',
    expiration: '2024-12-31',
  },
  {
    id: '2',
    rewardToken: '0x8765...4321',
    amount: '500,000 AI',
    expiration: '2024-06-30',
  }
]

export function ActiveLocks() {
  const [currentPage, setCurrentPage] = useState(1)
  const [locks] = useState<Lock[]>(mockLocks)

  const totalPages = Math.ceil(locks.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedLocks = locks.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <section className="space-y-4">
      <h2 className="text-2xl">Active Locks</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Reward Token</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Expiration Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedLocks.map(lock => (
            <TableRow key={lock.id}>
              <TableCell>
                <Link href={`/eth/my-locks/${lock.id}`} className="text-primary hover:underline">
                  {lock.id}
                </Link>
              </TableCell>
              <TableCell className="font-mono">{lock.rewardToken}</TableCell>
              <TableCell>{lock.amount}</TableCell>
              <TableCell>{lock.expiration}</TableCell>
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