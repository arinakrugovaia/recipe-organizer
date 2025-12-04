'use client'

import { RecipeForm } from '@/features/recipe-editor/components/RecipeForm'
import { StarIcon } from '@/shared/icons/StarIcon'

export default function NewRecipePage() {
  return (
    <div className="w-full flex flex-col justify-start gap-4">
      <div className="w-full flex justify-start items-center gap-3 mt-6 mb-2">
        <h2 className="text-2xl font-semibold">new recipe</h2>
        <StarIcon />
      </div>
      <RecipeForm />
    </div>
  )
}
