import { Montserrat } from 'next/font/google'
import localFont from 'next/font/local'

import type { Metadata } from 'next'

import './globals.css'

import Providers from '@/lib/providers'

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
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </head>
      <body
        className={`${federation.variable} ${montserrat.variable} ${montserrat.className}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
