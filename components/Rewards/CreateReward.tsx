'use client'

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

export function CreateReward() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create Reward</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Reward</DialogTitle>
          <DialogDescription>
            Set up rewards for token lockers based on their points.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="stream" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stream">Stream</TabsTrigger>
            <TabsTrigger value="fixed">Fixed</TabsTrigger>
          </TabsList>

          <TabsContent value="stream" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="streamToken" className="text-right">
                  Reward Token
                </Label>
                <Input
                  id="streamToken"
                  placeholder="Token address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="streamAmount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="streamAmount"
                  type="number"
                  placeholder="Reward amount"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="streamDuration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="streamDuration"
                  type="number"
                  placeholder="Days"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Stream</Button>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="fixed" className="space-y-4">
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fixedToken" className="text-right">
                  Reward Token
                </Label>
                <Input
                  id="fixedToken"
                  placeholder="Token address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fixedAmount" className="text-right">
                  Amount
                </Label>
                <Input
                  id="fixedAmount"
                  type="number"
                  placeholder="Reward amount"
                  className="col-span-3"
                />
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Fixed rewards are distributed immediately to eligible participants based on their current points.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Create Fixed Reward</Button>
            </DialogFooter>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}