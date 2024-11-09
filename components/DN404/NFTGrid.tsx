'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type NFT = {
  id: string
  name: string
  image: string
  tokenId: number
  tokenAmount: number
  lockTime: string
  selected?: boolean
}

interface NFTGridProps {
  mode?: 'redeem' | 'convert'
  onSelectionChange?: (nfts: NFT[]) => void
}

export function NFTGrid({ mode = 'convert', onSelectionChange }: NFTGridProps) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('tokenId')
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: '1',
      name: 'NFT #1',
      image: '/logo.png',
      tokenId: 1,
      tokenAmount: 1000,
      lockTime: '2024-03-20',
      selected: false,
    },
    {
      id: '2',
      name: 'NFT #2',
      image: '/logo.png',
      tokenId: 2,
      tokenAmount: 2000,
      lockTime: '2024-03-21',
      selected: false,
    },
  ])

  const toggleNFTSelection = (nftId: string) => {
    if (mode !== 'redeem') return

    const updatedNfts = nfts.map(nft => 
      nft.id === nftId ? { ...nft, selected: !nft.selected } : nft
    )
    setNfts(updatedNfts)
    onSelectionChange?.(updatedNfts.filter(nft => nft.selected))
  }

  const sortedNFTs = [...nfts].sort((a, b) => {
    switch (sortBy) {
      case 'tokenAmount':
        return a.tokenAmount - b.tokenAmount
      case 'lockTime':
        return new Date(a.lockTime).getTime() - new Date(b.lockTime).getTime()
      case 'tokenId':
      default:
        return a.tokenId - b.tokenId
    }
  })

  const filteredNFTs = sortedNFTs.filter(nft =>
    nft.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search NFTs..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-xs"
        />
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="tokenId">Token ID</SelectItem>
            <SelectItem value="tokenAmount">Token Amount</SelectItem>
            <SelectItem value="lockTime">Lock Time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredNFTs.map(nft => (
          <div
            key={nft.id}
            className={`rounded-lg border bg-card p-4 transition-all ${
              mode === 'redeem'
                ? 'cursor-pointer hover:border-primary'
                : 'hover:shadow-lg'
            } ${nft.selected ? 'border-primary bg-primary/10' : ''}`}
            onClick={() => toggleNFTSelection(nft.id)}>
            <div className="relative aspect-square overflow-hidden rounded-md">
              <Image
                src={nft.image}
                alt={nft.name}
                fill
                className="object-cover"
              />
              {mode === 'redeem' && nft.selected && (
                <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                  <div className="bg-primary text-primary-foreground rounded-full p-2">
                    ✓
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-2">
              <h3 className="text-lg font-semibold">{nft.name}</h3>
              <div className="text-sm text-muted-foreground">
                <p>Token ID: {nft.tokenId}</p>
                <p>Redeemable: {nft.tokenAmount.toLocaleString()} tokens</p>
                <p>Lock Time: {new Date(nft.lockTime).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredNFTs.length === 0 && (
        <div className="text-center text-muted-foreground">
          No NFTs found matching your search.
        </div>
      )}
    </div>
  )
}