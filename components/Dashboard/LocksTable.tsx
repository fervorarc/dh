'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

type Lock = {
  id: string
  token: {
    symbol: string
    icon: string
  }
  amount: string
  multiplier: number
  unlockDate: string
  isUnlockable: boolean
}

const columns: ColumnDef<Lock>[] = [
  {
    accessorKey: 'token',
    header: 'Token',
    cell: ({ row }) => {
      const token = row.getValue('token') as Lock['token']
      return (
        <div className="flex items-center gap-2">
          <Image
            src={token.icon}
            alt={token.symbol}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{token.symbol}</span>
        </div>
      )
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    accessorKey: 'multiplier',
    header: 'Multiplier',
    cell: ({ row }) => `${row.getValue('multiplier')}x`,
  },
  {
    accessorKey: 'unlockDate',
    header: 'Unlock Date',
    cell: ({ row }) => {
      const date = new Date(row.getValue('unlockDate'))
      const now = new Date()
      const daysUntilUnlock = Math.ceil(
        (date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
      )
      return (
        <div className="space-y-1">
          <div>{date.toLocaleDateString()}</div>
          {daysUntilUnlock > 0 && daysUntilUnlock <= 7 && (
            <div className="text-sm text-yellow-500">
              {daysUntilUnlock} days remaining
            </div>
          )}
        </div>
      )
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const isUnlockable = row.original.isUnlockable
      return (
        <Button
          variant="outline"
          size="sm"
          disabled={!isUnlockable}
          onClick={() => console.log('Unlock', row.original.id)}>
          {isUnlockable ? 'Unlock' : 'Locked'}
        </Button>
      )
    },
  },
]

export function LocksTable() {
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'unlockDate', desc: false },
  ])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])

  const data: Lock[] = [
    {
      id: '1',
      token: { symbol: 'ETH', icon: '/chains/ethereum.svg' },
      amount: '1.5',
      multiplier: 2.5,
      unlockDate: '2024-04-01',
      isUnlockable: false,
    },
    // Add more mock data as needed
  ]

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    state: {
      sorting,
      columnFilters,
    },
  })

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Active Locks</h2>
        <Input
          placeholder="Filter tokens..."
          value={(table.getColumn('token')?.getFilterValue() as string) ?? ''}
          onChange={event =>
            table.getColumn('token')?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}>
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center">
                  No locks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}>
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  )
}