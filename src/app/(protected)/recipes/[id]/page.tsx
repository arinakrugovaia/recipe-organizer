'use client'

import { useParams } from 'next/navigation'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { useMemo } from 'react'
import { Spinner } from '@heroui/react'
import { RecipeForm } from '@/features/recipe-editor/components/RecipeForm'
import { StarIcon } from '@/shared/icons/StarIcon'

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>()
  const { userRecipes, isLoading, error } = useRecipesStore()

  const recipe = useMemo(() => {
    return userRecipes.find((r) => r.id === id) || null
  }, [userRecipes, id])

  if (error) return <p className="text-red-500 text-sm">{error}</p>

  if (isLoading && userRecipes.length === 0) {
    return (
      <Spinner
        label="loading recipe..."
        variant="wave"
        classNames={{
          dots: 'bg-accent',
          label: 'text-gray',
        }}
      />
    )
  }

  if (!isLoading && userRecipes.length > 0 && !recipe)
    return (
      <p className="text-red-500 text-sm">Recipe not found. Try again later.</p>
    )

  if (!recipe) {
    return (
      <Spinner
        label="loading..."
        variant="wave"
        classNames={{
          dots: 'bg-accent',
          label: 'text-gray',
        }}
      />
    )
  }

  return (
    <div className="w-full flex flex-col justify-start gap-4">
      <div className="w-full flex justify-start items-center gap-3 mt-6 mb-2">
        <h2 className="text-2xl font-semibold">edit recipe</h2>
        <StarIcon />
      </div>
      <RecipeForm initialRecipe={recipe} />
    </div>
  )
}
