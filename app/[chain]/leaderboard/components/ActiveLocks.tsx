'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
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
    amount: '1,000,000 MOCHI',
    expiration: '2024-12-31',
  },
  {
    id: '2',
    rewardToken: '0x2345...6789',
    amount: '500,000 MOCHI',
    expiration: '2024-06-30',
  },
  {
    id: '3',
    rewardToken: '0x3456...7890',
    amount: '2,000,000 MOCHI',
    expiration: '2024-09-30',
  },
]

export function ActiveLocks() {
  const params = useParams()
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
                <Link 
                  href={`/${params.chain}/my-locks/${lock.id}`}
                  className="font-mono text-primary hover:underline">
                  {lock.id}
                </Link>
              </TableCell>
              <TableCell className="font-mono">{lock.rewardToken}</TableCell>
              <TableCell>{lock.amount}</TableCell>
              <TableCell>{new Date(lock.expiration).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
          {paginatedLocks.length === 0 && (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-4">
                No locks found
              </TableCell>
            </TableRow>
          )}
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