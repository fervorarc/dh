'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { NFTGrid } from './NFTGrid'

type ConversionDialogProps = {
  isOpen: boolean
  onClose: () => void
}

export function ConversionDialog({ isOpen, onClose }: ConversionDialogProps) {
  const [activeTab, setActiveTab] = useState('nftToTokens')

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Convert DN404 Tokens</DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="nftToTokens">NFT to Tokens</TabsTrigger>
            <TabsTrigger value="tokensToNft">Tokens to NFT</TabsTrigger>
          </TabsList>

          <TabsContent value="nftToTokens" className="space-y-4">
            <NFTGrid />
          </TabsContent>

          <TabsContent value="tokensToNft" className="space-y-4">
            <NFTGrid />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}