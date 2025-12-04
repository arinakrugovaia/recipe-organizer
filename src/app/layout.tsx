import type { Metadata } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.css'
import React from 'react'
import Header from '@/app/layout/Header'
import { UIProvider } from '@/app/providers/UIProvider'
import { siteConfig } from '@/shared/config/site.config'
import { layoutConfig } from '@/shared/config/layout.config'
import { SessionProvider } from 'next-auth/react'
import { auth } from '@/features/auth/auth'
import { AppLoader } from '@/shared/hoc/AppLoader'
import { PageTitle } from '@/shared/ui/PageTitle'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
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
    <html
      lang="en"
      className={`${inter.variable} ${sora.variable} antialiased`}
    >
      <body>
        <UIProvider>
          <SessionProvider session={session}>
            <AppLoader>
              <Header />
              <main
                className="flex flex-col justify-start mx-auto items-center max-w-[1024px] w-full px-6"
                style={{
                  minHeight: `calc(100vh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight})`,
                }}
              >
                <h1 className="visually-hidden">Recipe organizer</h1>
                <PageTitle />
                {children}
              </main>
              <footer
                className="flex justify-center items-center text-gray"
                style={{
                  height: layoutConfig.footerHeight,
                }}
              >
                <p>{siteConfig.description}</p>
              </footer>
            </AppLoader>
          </SessionProvider>
        </UIProvider>
      </body>
    </html>
  )
}
