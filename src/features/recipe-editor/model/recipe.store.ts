import { IRecipe } from '@/shared/types/recipes'
import { RecipeFormType } from '@/schema/zod'
import { create } from 'zustand'
import { getRecipes } from '@/features/recipe-editor/model/actions/getRecipes'
import { createRecipe as createRecipeAction } from '@/features/recipe-editor/model/actions/createRecipe'
import { deleteRecipe } from '@/features/recipe-editor/model/actions/deleteRecipe'
import { updateRecipe } from '@/features/recipe-editor/model/actions/updateRecipe'

interface RecipeState {
  userRecipes: IRecipe[]
  filteredUserRecipes: IRecipe[]
  publicRecipes: IRecipe[]
  filteredPublicRecipes: IRecipe[]
  searchQuery: string
  isLoading: boolean
  error: string | null
  loadRecipes: () => Promise<void>
  createRecipe: (formData: RecipeFormType) => Promise<void>
  removeRecipe: (id: string) => Promise<void>
  editRecipe: (id: string, formData: RecipeFormType) => Promise<void>
  setSearchQuery: (query: string) => void
  recalculateFiltered: () => void
  resetRecipes: () => void
}

export const useRecipesStore = create<RecipeState>((set, get) => ({
  userRecipes: [],
  filteredUserRecipes: [],
  publicRecipes: [],
  filteredPublicRecipes: [],
  searchQuery: '',
  isLoading: false,
  error: null,
  loadRecipes: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await getRecipes()

      if (result.success) {
        set({
          isLoading: false,
          userRecipes: result.userRecipes,
          publicRecipes: result.publicRecipes,
        })
        get().recalculateFiltered()
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
          userRecipes: [...state.userRecipes, result.recipe!],
        }))

        get().recalculateFiltered()
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
          userRecipes: state.userRecipes.filter((r) => r.id !== id),
        }))

        get().recalculateFiltered()
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
          userRecipes: state.userRecipes.map((r) =>
            r.id === id ? result.recipe! : r,
          ),
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
    set({ searchQuery: query })
    get().recalculateFiltered()
  },
  recalculateFiltered: () => {
    const { userRecipes, publicRecipes, searchQuery } = get()

    const filteredUser = searchQuery.trim()
      ? userRecipes.filter((r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : userRecipes

    const filteredPublic = searchQuery.trim()
      ? publicRecipes.filter((r) =>
          r.name.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : publicRecipes

    set({
      filteredUserRecipes: filteredUser,
      filteredPublicRecipes: filteredPublic,
    })
  },
  resetRecipes: () => {
    set({
      userRecipes: [],
      filteredUserRecipes: [],
      publicRecipes: [],
      filteredPublicRecipes: [],
      searchQuery: '',
      isLoading: false,
      error: null,
    })
  },
}))
