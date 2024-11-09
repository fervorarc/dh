'use client'

export function WalletBalance() {
  return (
    <div className="flex justify-between items-center p-4 bg-secondary rounded-lg mb-4">
      <div>
        <p className="text-sm text-muted-foreground">Token Balance</p>
        <p className="text-lg font-semibold">1,000,000 MOCHI</p>
      </div>
      <div>
        <p className="text-sm text-muted-foreground">NFT Balance</p>
        <p className="text-lg font-semibold">2 NFTs</p>
      </div>
    </div>
  )
}