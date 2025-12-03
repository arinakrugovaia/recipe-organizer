import { create } from 'zustand'
import { IIngredient } from '@/shared/types/ingredients'
import { IngredientFormType } from '@/schema/zod'
import { getIngredients } from '@/features/ingredient-editor/model/actions/getIngredients'
import { createIngredient } from '@/features/ingredient-editor/model/actions/createIngredient'
import { deleteIngredient } from '@/features/ingredient-editor/model/actions/deleteIngredient'

interface IngredientState {
  ingredients: IIngredient[]
  isLoading: boolean
  error: string | null
  loadIngredients: () => Promise<void>
  createIngredient: (formData: IngredientFormType) => Promise<void>
  removeIngredient: (id: string) => Promise<void>
}

export const useIngredientStore = create<IngredientState>((set) => ({
  ingredients: [],
  isLoading: false,
  error: null,
  loadIngredients: async () => {
    set({ isLoading: true, error: null })
    try {
      const result = await getIngredients()

      if (result.success) {
        set({ isLoading: false, ingredients: result.ingredients })
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to fetch ingredients.', isLoading: false })
    }
  },
  createIngredient: async (formData: IngredientFormType) => {
    set({ isLoading: true, error: null })
    try {
      const result = await createIngredient(formData)

      if (result.success) {
        set((state) => ({
          isLoading: false,
          ingredients: [...state.ingredients, result.ingredient!],
        }))
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to create ingredient.', isLoading: false })
    }
  },
  removeIngredient: async (id: string) => {
    set({ isLoading: true, error: null })
    try {
      const result = await deleteIngredient(id)

      if (result.success) {
        set((state) => ({
          isLoading: false,
          ingredients: state.ingredients.filter((i) => i.id !== id),
        }))
      } else {
        set({ isLoading: false, error: result.error })
      }
    } catch (err) {
      console.error('Error: ', err)
      set({ error: 'Failed to delete ingredient.', isLoading: false })
    }
  },
}))
