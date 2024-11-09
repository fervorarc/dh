'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface NFT {
  name: string
  tokenId: string
  lockTimestamp: number
  traits: Record<string, string>
  previousOwner: string
  tokensRequired: string
}

interface NFTDetailsProps {
  nft: NFT | null
  onRedeem: () => void
}

export function NFTDetails({ nft, onRedeem }: NFTDetailsProps) {
  const [countdown, setCountdown] = useState('')
  const [gasEstimate, setGasEstimate] = useState('')
  const [canRedeem, setCanRedeem] = useState(false)

  useEffect(() => {
    if (nft?.lockTimestamp) {
      const cooldownPeriod = 24 * 60 * 60 * 1000 // 24 hours
      const timeLeft = nft.lockTimestamp + cooldownPeriod - Date.now()
      
      if (timeLeft > 0) {
        const hours = Math.floor(timeLeft / (60 * 60 * 1000))
        const minutes = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
        setCountdown(`${hours}h ${minutes}m`)
        setCanRedeem(false)
      } else {
        setCountdown('')
        setCanRedeem(true)
      }
    }
  }, [nft])

  if (!nft) {
    return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Select an NFT to view details
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold">{nft.name}</h3>
        <p className="text-sm text-muted-foreground">
          Token ID: {nft.tokenId}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Traits</h4>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(nft.traits).map(([key, value]) => (
            <div
              key={key}
              className="bg-secondary rounded p-2 text-sm">
              <span className="text-muted-foreground">{key}:</span>{' '}
              {value}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Lock Details</h4>
        <p className="text-sm">
          Locked: {new Date(nft.lockTimestamp).toLocaleString()}
        </p>
        <p className="text-sm">
          Previous Owner: {nft.previousOwner}
        </p>
      </div>

      <div className="space-y-2">
        <h4 className="font-medium">Redemption</h4>
        <Input
          value={nft.tokensRequired}
          readOnly
          className="bg-secondary"
        />
        {countdown && (
          <p className="text-sm text-yellow-500">
            Cooldown: {countdown} remaining
          </p>
        )}
        {gasEstimate && (
          <p className="text-sm text-muted-foreground">
            Estimated Gas: {gasEstimate}
          </p>
        )}
      </div>

      <Button
        className="w-full"
        disabled={!canRedeem}
        onClick={onRedeem}>
        {canRedeem ? 'Redeem NFT' : 'In Cooldown'}
      </Button>
    </div>
  )
}