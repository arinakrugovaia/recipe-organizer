import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from '@/app/layout/Header'
import { HeroUIProviderComponent } from '@/app/providers/HeroUIProvider'
import { siteConfig } from '@/shared/config/site.config'
import { layoutConfig } from '@/shared/config/layout.config'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/features/auth/auth'
import { AppLoader } from '@/shared/hoc/AppLoader'

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <HeroUIProviderComponent>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <main
                className="flex flex-col justify-start items-center w-full p-4"
                style={{
                  height: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
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
            </AppLoader>
          </SessionProvider>
        </HeroUIProviderComponent>
      </body>
    </html>
  )
}
