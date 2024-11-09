'use client'

import Link from 'next/link'
import Image from 'next/image'
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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

type Token = {
  id: string
  logo: string
  token: string
  address: string
  tvl: number
  chain: string
}

const columns: ColumnDef<Token>[] = [
  {
    accessorKey: 'logo',
    header: '',
    cell: ({ row }) => (
      <Image
        src={row.getValue('logo')}
        alt={row.getValue('token')}
        width={32}
        height={32}
        className="rounded-full"
      />
    ),
  },
  {
    accessorKey: 'token',
    header: 'Token',
    cell: ({ row }) => {
      return (
        <Link
          href={`/${row.original.chain}/leaderboard/${row.original.token}`}
          className="text-primary hover:underline">
          {row.getValue('token')}
        </Link>
      )
    },
  },
  {
    accessorKey: 'address',
    header: 'Address',
    cell: ({ row }) => {
      const address = row.getValue('address') as string
      const explorerUrl = `https://etherscan.io/token/${address}`
      return (
        <Link href={explorerUrl} target="_blank" className="text-primary hover:underline">
          {address.slice(0, 6)}...{address.slice(-4)}
        </Link>
      )
    }
  },
  {
    accessorKey: 'tvl',
    header: 'TVL',
    cell: ({ row }) => `$${row.getValue<number>('tvl').toLocaleString()}`
  },
]

function getData(): Token[] {
  return [
    {
      id: '1',
      logo: '/logo.png',
      token: 'AI',
      address: '0x2598c30330D5771AE9F983979209486aE26dE875',
      tvl: 1000000,
      chain: 'eth',
    },
    {
      id: '2',
      logo: '/chains/ethereum.svg',
      token: 'WETH',
      address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      tvl: 5000000,
      chain: 'eth',
    },
    {
      id: '3',
      logo: '/chains/polygon.svg',
      token: 'MATIC',
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      tvl: 750000,
      chain: 'eth',
    }
  ]
}

interface LeaderboardProps {
  chain: string
}

export function Leaderboard({ chain }: LeaderboardProps) {
  const table = useReactTable({
    data: getData().map(item => ({ ...item, chain })),
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <section>
      <div className="flex justify-between items-center py-4">
        <p>Select a token to lock!</p>
        <Input
          placeholder="Search"
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
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end mt-4">
        <Button asChild className="glow">
          <Link href={`/${chain}/create-leaderboard`}>Create Leaderboard</Link>
        </Button>
      </div>
    </section>
  )
}