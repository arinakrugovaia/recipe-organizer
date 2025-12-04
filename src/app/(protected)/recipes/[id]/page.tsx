'use client'

import { useParams } from 'next/navigation'
import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { useEffect, useState } from 'react'
import { IRecipe } from '@/shared/types/recipes'
import { Spinner } from '@heroui/react'
import { RecipeForm } from '@/features/recipe-editor/components/RecipeForm'
import { StarIcon } from '@/shared/icons/StarIcon'

export default function EditRecipePage() {
  const { id } = useParams<{ id: string }>()

  const { recipes, isLoading, error } = useRecipesStore()
  const [recipe, setRecipe] = useState<IRecipe | null>(null)

  useEffect(() => {
    if (recipes.length > 0) {
      if (isLoading) return
      if (!recipes.length) return

      const found = recipes.find((r) => r.id === id) || null
      setRecipe(found)
    }
  }, [recipes, id])

  if (isLoading) {
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
  if (error) return <p className="text-red-500 text-sm">{error}</p>
  if (recipes.length > 0 && !recipe)
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
