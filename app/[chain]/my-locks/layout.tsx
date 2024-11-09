'use client'

import Header from '@/components/Header'

export const dynamic = 'force-static'

export default function MyLocksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}