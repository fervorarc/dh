'use client'

import Header from '@/components/Header'
import Providers from '@/lib/providers'

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Providers>
      <Header />
      {children}
    </Providers>
  )
}