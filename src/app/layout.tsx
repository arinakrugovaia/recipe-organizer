import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from '@/components/ui/Header'
import { HeroUIProviderComponent } from '@/providers/HeroUIProvider'
import { siteConfig } from '@/config/site.config'
import { layoutConfig } from '@/config/layout.config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProviderComponent>
          <Header />
          <main
            className="flex flex-col justify-start items-center w-full p-4"
            style={{
              minHeight: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
            }}
          >
            {children}
          </main>
          <footer
            className="flex justify-center items-center"
            style={{
              height: layoutConfig.footerHeight,
            }}
          >
            <p>{siteConfig.description}</p>
          </footer>
        </HeroUIProviderComponent>
      </body>
    </html>
  )
}
