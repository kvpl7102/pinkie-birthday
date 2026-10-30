import type { Metadata } from 'next'
import { Inter, Dancing_Script, Kalam, Caveat, Cormorant_Garamond } from 'next/font/google'
import YearSwitcher from './components/navigation/YearSwitcher'
import DirectionSwitcher from './components/navigation/DirectionSwitcher'
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
const cormorant = Cormorant_Garamond({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-cormorant',
  weight: ['400', '500', '600', '700'],
  display: 'swap'
})

export const metadata: Metadata = {
  title: 'Happy Birthday, Pinkie!',
  description: 'Món quà sinh nhật cho cô gái văn chương',
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof window !== 'undefined') {
                window.addEventListener('unhandledrejection', function(event) {
                  if (event && event.reason && !(event.reason instanceof Error)) {
                    event.preventDefault();
                  }
                });
                window.addEventListener('error', function(event) {
                  if (event && !(event.error instanceof Error)) {
                    event.preventDefault();
                  }
                });
              }
            `,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${dancingScript.variable} ${kalam.variable} ${caveat.variable} ${cormorant.variable}`}
      >
        <YearSwitcher />
        <DirectionSwitcher />
        {children}
      </body>
    </html>
  )
}