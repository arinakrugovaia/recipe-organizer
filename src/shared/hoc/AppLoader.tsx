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
  const { setAuthState } = useAuthStore()
  const { loadIngredients, resetIngredients } = useIngredientStore()
  const { loadRecipes, resetRecipes } = useRecipesStore()

  useEffect(() => {
    setAuthState(status, session)
  }, [status, session, setAuthState])

  useEffect(() => {
    if (status === 'authenticated') {
      loadIngredients()
      loadRecipes()
    }
  }, [status, loadIngredients, loadRecipes])

  useEffect(() => {
    if (status === 'unauthenticated') {
      resetIngredients()
      resetRecipes()
    }
  }, [status, resetIngredients, resetRecipes])

  return <>{children}</>
}
