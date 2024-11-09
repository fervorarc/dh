'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NFTGrid } from '@/components/DN404/NFTGrid'

type PaymentMethod = 'token' | 'nft'
type PaymentStep = 'select' | 'approve' | 'transfer'

interface PaymentDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function PaymentDialog({ open, onOpenChange, onSuccess }: PaymentDialogProps) {
  const { address } = useAccount()
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('token')
  const [paymentStep, setPaymentStep] = useState<PaymentStep>('select')
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [isApproving, setIsApproving] = useState(false)
  const [isTransferring, setIsTransferring] = useState(false)

  // Mock contract addresses - these would come from your environment config
  const CONTRACT_ADDRESSES = {
    anyInu: '0x1234...5678',
    dn404: '0x8765...4321',
    leaderboard: '0x9876...5432',
  }

  const handleApprove = async () => {
    if (!address) return
    
    setIsApproving(true)
    try {
      if (paymentMethod === 'token') {
        // Approve Any Inu tokens
        // const contract = new Contract(CONTRACT_ADDRESSES.anyInu, AnyInuABI, signer)
        // await contract.approve(CONTRACT_ADDRESSES.leaderboard, ethers.parseUnits('100000', 18))
        console.log('Approving 100,000 Any Inu tokens')
      } else {
        // Approve DN404 NFT
        // const contract = new Contract(CONTRACT_ADDRESSES.dn404, DN404ABI, signer)
        // await contract.approve(CONTRACT_ADDRESSES.leaderboard, selectedNFT.tokenId)
        console.log('Approving DN404 NFT transfer')
      }
      setPaymentStep('transfer')
    } catch (error) {
      console.error('Approval failed:', error)
    } finally {
      setIsApproving(false)
    }
  }

  const handleTransfer = async () => {
    if (!address) return

    setIsTransferring(true)
    try {
      // const contract = new Contract(CONTRACT_ADDRESSES.leaderboard, LeaderboardABI, signer)
      if (paymentMethod === 'token') {
        // await contract.createLeaderboardWithTokens(leaderboardConfig)
        console.log('Transferring tokens and creating leaderboard')
      } else {
        // await contract.createLeaderboardWithNFT(selectedNFT.tokenId, leaderboardConfig)
        console.log('Transferring NFT and creating leaderboard')
      }
      onSuccess()
      onOpenChange(false)
    } catch (error) {
      console.error('Transfer failed:', error)
    } finally {
      setIsTransferring(false)
    }
  }

  const renderPaymentContent = () => {
    const commonButtonProps = {
      className: 'w-full',
      disabled: !address,
    }

    if (!address) {
      return (
        <div className="text-center p-4">
          <p className="text-muted-foreground mb-4">Connect your wallet to continue</p>
        </div>
      )
    }

    return (
      <Tabs value={paymentMethod} onValueChange={(v) => {
        setPaymentMethod(v as PaymentMethod)
        setPaymentStep('select')
      }}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="token">Pay with Tokens</TabsTrigger>
          <TabsTrigger value="nft">Pay with NFT</TabsTrigger>
        </TabsList>

        <TabsContent value="token" className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/logo.png"
                alt="Any Inu"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div>
                <h3 className="font-semibold">100,000 Any Inu Tokens</h3>
                <p className="text-sm text-muted-foreground">Required payment</p>
              </div>
            </div>
            {paymentStep === 'select' && (
              <Button 
                {...commonButtonProps}
                onClick={() => setPaymentStep('approve')}>
                Continue with Tokens
              </Button>
            )}
            {paymentStep === 'approve' && (
              <Button 
                {...commonButtonProps}
                onClick={handleApprove}
                disabled={isApproving}>
                {isApproving ? 'Approving...' : 'Approve Tokens'}
              </Button>
            )}
            {paymentStep === 'transfer' && (
              <Button 
                {...commonButtonProps}
                onClick={handleTransfer}
                disabled={isTransferring}>
                {isTransferring ? 'Creating...' : 'Create Leaderboard'}
              </Button>
            )}
          </div>
        </TabsContent>

        <TabsContent value="nft" className="space-y-4">
          <div className="p-4 bg-secondary rounded-lg">
            <h3 className="font-semibold mb-4">Select 1 DN404 NFT</h3>
            <NFTGrid 
              mode="redeem"
              onSelectionChange={(nfts) => {
                setSelectedNFT(nfts[0])
                if (nfts[0]) {
                  setPaymentStep('approve')
                }
              }}
            />
            {paymentStep === 'approve' && selectedNFT && (
              <Button 
                {...commonButtonProps}
                className="mt-4"
                onClick={handleApprove}
                disabled={isApproving}>
                {isApproving ? 'Approving...' : 'Approve NFT'}
              </Button>
            )}
            {paymentStep === 'transfer' && selectedNFT && (
              <Button 
                {...commonButtonProps}
                className="mt-4"
                onClick={handleTransfer}
                disabled={isTransferring}>
                {isTransferring ? 'Creating...' : 'Create Leaderboard'}
              </Button>
            )}
          </div>
        </TabsContent>
      </Tabs>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Payment Required</DialogTitle>
          <DialogDescription>
            Choose your payment method to create a leaderboard
          </DialogDescription>
        </DialogHeader>

        {renderPaymentContent()}
      </DialogContent>
    </Dialog>
  )
}