import type { Metadata } from 'next'
import { Inter, Dancing_Script, Kalam, Caveat } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})
const kalam = Kalam({
  subsets: ['latin'],
  variable: '--font-kalam',
  weight: ['300', '400', '700'],
  display: 'swap'
})
const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Happy Birthday, Pinkie!',
  description: 'Món quà sinh nhật nho nhỏ cho cô gái văn chương',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${dancingScript.variable} ${kalam.variable} ${caveat.variable}`}>
        {children}
      </body>
    </html>
  )
}