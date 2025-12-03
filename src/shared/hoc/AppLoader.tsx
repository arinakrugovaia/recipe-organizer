'use client'

import { useSession } from 'next-auth/react'
import { useAuthStore } from '@/features/auth/model/auth.store'
import React, { ReactNode, useEffect } from 'react'
import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'

type appLoaderProps = {
  children: ReactNode
}

export function AppLoader({ children }: appLoaderProps) {
  const { data: session, status } = useSession()
  const { isAuth, setAuthState } = useAuthStore()
  const { loadIngredients } = useIngredientStore()

  useEffect(() => {
    setAuthState(status, session)
  }, [status, session, setAuthState])

  useEffect(() => {
    if (isAuth) {
      loadIngredients()
    }
  }, [isAuth, loadIngredients])

  return <>{children}</>
}
