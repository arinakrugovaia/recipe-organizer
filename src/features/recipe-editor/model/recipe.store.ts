import { IRecipe } from '@/shared/types/recipes'
import { RecipeFormType } from '@/schema/zod'
import { create } from 'zustand'
import { getRecipes } from '@/features/recipe-editor/model/actions/getRecipes'
import { createRecipe as createRecipeAction } from '@/features/recipe-editor/model/actions/createRecipe'
import { deleteRecipe } from '@/features/recipe-editor/model/actions/deleteRecipe'
import { updateRecipe } from '@/features/recipe-editor/model/actions/updateRecipe'

interface RecipeState {
  recipes: IRecipe[]
  filteredRecipes: IRecipe[]
  searchQuery: string
  isLoading: boolean
  error: string | null
  loadRecipes: () => Promise<void>
  createRecipe: (formData: RecipeFormType) => Promise<void>
  removeRecipe: (id: string) => Promise<void>
  editRecipe: (id: string, formData: RecipeFormType) => Promise<void>
  setSearchQuery: (query: string) => void
}

export const useRecipesStore = create<RecipeState>((set, get) => ({
  recipes: [],
  filteredRecipes: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  loadRecipes: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await getRecipes()

      if (result.success) {
        set({ isLoading: false, recipes: result.recipes })
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to fetch recipes.', isLoading: false })
    }
  },
  createRecipe: async (formData: RecipeFormType) => {
    set({ isLoading: true, error: null })

    try {
      const result = await createRecipeAction(formData)

      if (result.success) {
        set((state) => ({
          isLoading: false,
          recipes: [...state.recipes, result.recipe!],
        }))
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to create recipe.', isLoading: false })
    }
  },
  removeRecipe: async (id: string) => {
    set({ isLoading: true, error: null })

    try {
      const result = await deleteRecipe(id)

      if (result.success) {
        set((state) => ({
          isLoading: false,
          recipes: state.recipes.filter((r) => r.id !== id),
        }))
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to delete recipe.', isLoading: false })
    }
  },
  editRecipe: async (id: string, formData: RecipeFormType) => {
    set({ isLoading: true, error: null })

    try {
      const result = await updateRecipe(id, formData)

      if (result.success) {
        set((state) => ({
          isLoading: false,
          recipes: state.recipes.map((r) => (r.id === id ? result.recipe! : r)),
        }))
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to update recipe.', isLoading: false })
    }
  },
  setSearchQuery: (query: string) => {
    const { recipes } = get()
    const filtered = recipes.filter((r) =>
      r.name.toLowerCase().includes(query.toLowerCase()),
    )
    set({ searchQuery: query, filteredRecipes: filtered })
  },
}))
