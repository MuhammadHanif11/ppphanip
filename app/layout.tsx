import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Teknik Informatika 2025",
  description:
    "Tempat santai buat saling belajar coding, diskusi, dan sharing pengalaman sebelum dan selama kuliah.",
  generator: "/legion.png",
  icons: {
    icon: [
      {
        url: "/legion.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/legion.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/legion.png",
        type: "image/svg+xml",
      },
    ],
    apple: "/legion.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
