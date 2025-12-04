import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { RecipeCard } from '@/features/recipe-editor/components/RecipeCard'
import { Spinner } from '@heroui/react'

export function RecipesList() {
  const { recipes, isLoading, error } = useRecipesStore()

  if (isLoading) {
    return (
      <Spinner
        label="loading ingredients..."
        variant="wave"
        classNames={{
          dots: 'bg-accent',
          label: 'text-gray',
        }}
      />
    )
  }

  return (
    <>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {recipes.map((r) => (
          <RecipeCard key={r.id} recipe={r} />
        ))}
      </div>
    </>
  )
}
