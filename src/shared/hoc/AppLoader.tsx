'use client'

import { useSession } from 'next-auth/react'
import { useAuthStore } from '@/features/auth/model/auth.store'
import React, { ReactNode, useEffect } from 'react'

type appLoaderProps = {
  children: ReactNode
}

export function AppLoader({ children }: appLoaderProps) {
  const { data: session, status } = useSession()
  const { setAuthState } = useAuthStore()

  useEffect(() => {
    setAuthState(status, session)
  }, [status, session, setAuthState])

  return <>{children}</>
}
