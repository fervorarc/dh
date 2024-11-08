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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function CreateLeaderboard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Leaderboard</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Token Leaderboard</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="logo" className="text-right">
              Token Logo
            </Label>
            <Input id="logo" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Token Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="symbol" className="text-right">
              Token Symbol
            </Label>
            <Input id="symbol" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Token Address
            </Label>
            <Input id="address" className="col-span-3" />
          </div>
        </div>
        <div>
          <Tabs defaultValue="constant" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="constant">Constant</TabsTrigger>
              <TabsTrigger value="linear">Linear</TabsTrigger>
            </TabsList>
            <TabsContent value="constant">
              <div>
                <div>Constant</div>
              </div>
            </TabsContent>
            <TabsContent value="linear">
              <div>
                <div>Linear</div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        <DialogFooter>
          <Button type="submit">Authorize</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
