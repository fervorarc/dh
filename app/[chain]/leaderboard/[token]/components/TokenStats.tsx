'use client'

export function TokenStats() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl">Token Statistics</h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-secondary">
          <h3 className="text-lg font-semibold mb-2">Global Stats</h3>
          <p className="text-2xl font-bold">80B AI</p>
          <p className="text-sm text-muted-foreground">Total Locked Tokens</p>
        </div>
        
        <div className="p-4 rounded-lg bg-secondary">
          <h3 className="text-lg font-semibold mb-2">Personal Stats</h3>
          <div className="space-y-2">
            <div>
              <p className="text-xl font-bold">5M AI</p>
              <p className="text-sm text-muted-foreground">Your Locked Amount</p>
            </div>
            <div>
              <p className="text-xl font-bold">2.5x</p>
              <p className="text-sm text-muted-foreground">Average Multiplier</p>
            </div>
            <div>
              <p className="text-xl font-bold">12.5M</p>
              <p className="text-sm text-muted-foreground">Total Points</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}