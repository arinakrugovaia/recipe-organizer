import { useRecipesStore } from '@/features/recipe-editor/model/recipe.store'
import { RecipeCard } from '@/features/recipe-editor/components/RecipeCard'
import { IRecipe } from '@/shared/types/recipes'

interface RecipesListProps {
  recipes: IRecipe[]
  isOwned?: boolean
}

export function RecipesList({ recipes, isOwned = false }: RecipesListProps) {
  const { searchQuery } = useRecipesStore()

  if (searchQuery.trim() === '' && recipes.length === 0) {
    return (
      <div className="text-center text-gray text-base my-6">
        <p>📦 no recipes yet</p>
      </div>
    )
  }

  return (
    <>
      {searchQuery.trim() !== '' && recipes.length === 0 ? (
        <div className="text-center text-gray text-base mt-6">
          <p>no recipes found for {searchQuery}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
          {recipes.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              isOwned={isOwned}
              owner={r.user?.email || 'user'}
            />
          ))}
        </div>
      )}
    </>
  )
}
