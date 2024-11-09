'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { WalletBalance } from '@/components/DN404/WalletBalance'
import { NFTGrid } from '@/components/DN404/NFTGrid'
import { NFTDetails } from '@/components/DN404/NFTDetails'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function DN404Client() {
  const [selectedNFTs, setSelectedNFTs] = useState<any[]>([])
  const [tokenAmount, setTokenAmount] = useState('')

  // Mock redemption rate - this would come from your contract
  const REDEMPTION_RATE = 1000 // 1000 tokens per NFT
  const maxNFTsPossible = Math.floor(Number(tokenAmount) / REDEMPTION_RATE)

  const totalRedeemableTokens = selectedNFTs.reduce(
    (sum, nft) => sum + nft.tokenAmount,
    0
  )

  return (
    <>
      <WalletBalance />

      <Tabs defaultValue="tokensToNft" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="tokensToNft">Tokens → NFT</TabsTrigger>
          <TabsTrigger value="nftToTokens">NFT → Tokens</TabsTrigger>
        </TabsList>

        <TabsContent value="tokensToNft" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NFTGrid mode="convert" />
            </div>
            <div className="space-y-6">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-lg font-semibold mb-4">Token Redemption</h3>
                <div className="space-y-4">
                  <div>
                    <Label>Redemption Rate</Label>
                    <p className="text-2xl font-bold">{REDEMPTION_RATE} tokens = 1 NFT</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tokenAmount">Token Amount</Label>
                    <Input
                      id="tokenAmount"
                      type="number"
                      value={tokenAmount}
                      onChange={(e) => setTokenAmount(e.target.value)}
                      placeholder="Enter token amount"
                    />
                  </div>
                  <div>
                    <Label>Possible NFTs</Label>
                    <p className="text-xl font-semibold">
                      {maxNFTsPossible || 0} NFT{maxNFTsPossible !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                className="w-full" 
                disabled={!tokenAmount || Number(tokenAmount) < REDEMPTION_RATE}
                onClick={() => console.log('Convert tokens to NFTs')}>
                Convert to NFTs
              </Button>
              
              {Number(tokenAmount) > 0 && Number(tokenAmount) < REDEMPTION_RATE && (
                <p className="text-sm text-yellow-500 text-center">
                  Minimum {REDEMPTION_RATE} tokens required
                </p>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="nftToTokens" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <NFTGrid 
                mode="redeem"
                onSelectionChange={setSelectedNFTs}
              />
            </div>
            <div className="bg-card rounded-lg p-4 border space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Redemption Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Selected NFTs</p>
                    <p className="text-lg font-medium">{selectedNFTs.length}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Redeemable Tokens</p>
                    <p className="text-2xl font-bold">{totalRedeemableTokens.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Button 
                  className="w-full" 
                  disabled={selectedNFTs.length === 0}
                  onClick={() => console.log('Convert NFTs to tokens')}>
                  Convert to Tokens
                </Button>
                {selectedNFTs.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center">
                    Select NFTs to convert
                  </p>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}