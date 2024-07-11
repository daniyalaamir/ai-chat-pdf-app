import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: "normal"
})

export const metadata: Metadata = {
  title: 'PDF Wisdom',
  description: 'Chat with any PDF document',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.className}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
