export function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="border rounded-md">
          <div className="h-[400px] bg-muted/5 animate-pulse" />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="h-8 w-48 bg-muted animate-pulse rounded" />
        <div className="border rounded-md">
          <div className="h-[400px] bg-muted/5 animate-pulse" />
        </div>
      </div>
    </div>
  )
}