'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type NFT = {
  id: string
  name: string
  collection: string
  image: string
  tokenId: string
  contractAddress: string
}

export function NFTLockDialog() {
  const [open, setOpen] = useState(false)
  const [step, setStep] = useState<'select' | 'approve' | 'lock'>('select')
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [loading, setLoading] = useState(false)
  const [nfts, setNfts] = useState<NFT[]>([
    {
      id: '1',
      name: 'Example NFT #1',
      collection: 'Example Collection',
      image: '/logo.png',
      tokenId: '1',
      contractAddress: '0x1234...',
    },
  ])
  const [unlockDate, setUnlockDate] = useState('')

  const handleApprove = async () => {
    if (!selectedNFT) return
    setStep('lock')
  }

  const handleLock = async () => {
    if (!selectedNFT || !unlockDate) return
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">Lock NFTs</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {step === 'select' && 'Select NFT to Lock'}
            {step === 'approve' && 'Approve NFT'}
            {step === 'lock' && 'Lock NFT'}
          </DialogTitle>
          <DialogDescription>
            {step === 'select' && 'Choose an NFT from your collection to lock.'}
            {step === 'approve' && 'Approve the smart contract to manage your NFT.'}
            {step === 'lock' && 'Select the lock duration for your NFT.'}
          </DialogDescription>
        </DialogHeader>

        {loading ? (
          <div className="flex justify-center items-center h-[400px]">
            <div className="animate-pulse text-lg">Loading your NFTs...</div>
          </div>
        ) : (
          <>
            {step === 'select' && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[400px] overflow-y-auto p-2">
                {nfts.map((nft) => (
                  <div
                    key={nft.id}
                    className={`relative rounded-lg border-2 p-2 cursor-pointer transition-all ${
                      selectedNFT?.id === nft.id
                        ? 'border-primary bg-secondary'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedNFT(nft)}>
                    <div className="aspect-square relative mb-2">
                      <Image
                        src={nft.image}
                        alt={nft.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-semibold truncate">{nft.name}</p>
                      <p className="text-sm text-muted-foreground truncate">
                        {nft.collection}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 'approve' && selectedNFT && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={selectedNFT.image}
                      alt={selectedNFT.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedNFT.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedNFT.collection}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {step === 'lock' && selectedNFT && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 relative">
                    <Image
                      src={selectedNFT.image}
                      alt={selectedNFT.name}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedNFT.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedNFT.collection}
                    </p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="unlockDate">Unlock Date</Label>
                    <Input
                      id="unlockDate"
                      type="date"
                      value={unlockDate}
                      onChange={(e) => setUnlockDate(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        <DialogFooter>
          {step === 'select' && (
            <Button
              onClick={() => setStep('approve')}
              disabled={!selectedNFT}>
              Continue
            </Button>
          )}
          {step === 'approve' && (
            <Button onClick={handleApprove}>
              Approve NFT
            </Button>
          )}
          {step === 'lock' && (
            <Button
              onClick={handleLock}
              disabled={!unlockDate}>
              Lock NFT
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}