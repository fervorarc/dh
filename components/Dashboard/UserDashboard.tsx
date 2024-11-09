'use client'

import React, { useState } from 'react'
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
import { Input } from '@/components/ui/input'

type TokenLock = {
  id: string
  token: string
  tokenAddress: string
  amount: string
  multiplier: number
  unlockDate: string
  canUnlock: boolean
}

type NFTLock = {
  id: string
  collection: string
  tokenId: string
  unlockDate: string
  canUnlock: boolean
}

export function UserDashboard() {
  const params = useParams()
  const [searchTokenLocks, setSearchTokenLocks] = useState('')
  const [searchNFTLocks, setSearchNFTLocks] = useState('')

  // Mock data
  const [tokenLocks] = useState<TokenLock[]>([
    {
      id: '1',
      token: 'Any Inu',
      tokenAddress: '0x2598c30330D5771AE9F983979209486aE26dE875',
      amount: '1,000,000',
      multiplier: 2.5,
      unlockDate: '2024-12-31',
      canUnlock: false,
    },
    {
      id: '2',
      token: 'Any Inu',
      tokenAddress: '0x2598c30330D5771AE9F983979209486aE26dE875',
      amount: '500,000',
      multiplier: 1.5,
      unlockDate: '2024-06-30',
      canUnlock: false,
    }
  ])

  const [nftLocks] = useState<NFTLock[]>([
    {
      id: '1',
      collection: 'Any Inu NFT',
      tokenId: '42',
      unlockDate: '2024-12-31',
      canUnlock: false,
    }
  ])

  const handleUnlock = async (lockId: string) => {
    // Implement unlock logic
  }

  return (
    <div className="flex flex-col gap-8">
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Your Token Locks</h2>
          <Input
            placeholder="Search token locks..."
            value={searchTokenLocks}
            onChange={(e) => setSearchTokenLocks(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lock ID</TableHead>
              <TableHead>Token</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Multiplier</TableHead>
              <TableHead>Unlock Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tokenLocks.map((lock) => (
              <TableRow key={lock.id}>
                <TableCell>
                  <Link 
                    href={`/${params.chain}/my-locks/${lock.id}`}
                    className="text-primary hover:underline"
                  >
                    {lock.id}
                  </Link>
                </TableCell>
                <TableCell>
                  <Link 
                    href={`https://etherscan.io/token/${lock.tokenAddress}`}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {lock.token}
                  </Link>
                </TableCell>
                <TableCell>{lock.amount}</TableCell>
                <TableCell>{lock.multiplier}x</TableCell>
                <TableCell>{lock.unlockDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUnlock(lock.id)}
                    disabled={!lock.canUnlock}>
                    {lock.canUnlock ? 'Unlock' : 'Locked'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl">Your NFT Locks</h2>
          <Input
            placeholder="Search NFT locks..."
            value={searchNFTLocks}
            onChange={(e) => setSearchNFTLocks(e.target.value)}
            className="max-w-xs"
          />
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Lock ID</TableHead>
              <TableHead>Collection</TableHead>
              <TableHead>Token ID</TableHead>
              <TableHead>Unlock Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {nftLocks.map((lock) => (
              <TableRow key={lock.id}>
                <TableCell>
                  <Link 
                    href={`/${params.chain}/my-locks/${lock.id}`}
                    className="text-primary hover:underline"
                  >
                    {lock.id}
                  </Link>
                </TableCell>
                <TableCell>{lock.collection}</TableCell>
                <TableCell>{lock.tokenId}</TableCell>
                <TableCell>{lock.unlockDate}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleUnlock(lock.id)}
                    disabled={!lock.canUnlock}>
                    {lock.canUnlock ? 'Unlock' : 'Locked'}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    </div>
  )
}