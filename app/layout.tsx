import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'
import type { Metadata } from 'next'
import './globals.css'

import RootLayoutClient from './layout.client'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'auto',
})

const federation = localFont({
  src: [
    {
      path: '../public/fonts/FederationBold.woff',
      weight: '700',
    },
  ],
  variable: '--font-federation',
  display: 'auto',
})

export const metadata: Metadata = {
  title: 'Diamond Hands | AnyInu',
  description:
    "Lock tokens and let the Diamond Hands app be the trusty leash that keeps your tokens safe and sound. It's like a digital doghouse for your tokens, but with a lot more treats!",
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${federation.variable} ${montserrat.variable} ${montserrat.className}`}>
        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  )
}