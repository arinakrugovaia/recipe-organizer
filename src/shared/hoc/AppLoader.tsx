'use client'

import { useSession } from 'next-auth/react'
import { useAuthStore } from '@/features/auth/model/auth.store'
import React, { ReactNode, useEffect } from 'react'
import { useIngredientStore } from '@/features/ingredient-editor/model/ingredient.store'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'

type appLoaderProps = {
  children: ReactNode
}

export function AppLoader({ children }: appLoaderProps) {
  const { data: session, status } = useSession()
  const { isAuth, setAuthState } = useAuthStore()
  const { loadIngredients } = useIngredientStore()
  const { loadRecipes } = useRecipesStore()

  useEffect(() => {
    setAuthState(status, session)
  }, [status, session, setAuthState])

  useEffect(() => {
    if (isAuth) {
      loadIngredients()
    }
  }, [isAuth, loadIngredients])

  useEffect(() => {
    loadRecipes()
  }, [loadRecipes])

  return <>{children}</>
}
