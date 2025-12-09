import { IIngredient } from '@/shared/types/ingredients'

export interface IRecipeIngredient {
  id: string
  ingredientId: string
  quantity: number
  ingredient: IIngredient
}

export interface IRecipe {
  id: string
  name: string
  description: string
  imageUrl?: string | null
  isPublic: boolean
  ingredients: IRecipeIngredient[]
  userId: string
  user?: {
    id: string
    email: string
  }
}
