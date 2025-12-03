'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react'
import React from 'react'

export function UIProvider({ children }: { children: React.ReactNode }) {
  return (
    <HeroUIProvider>
      <ToastProvider />
      {children}
    </HeroUIProvider>
  )
}
