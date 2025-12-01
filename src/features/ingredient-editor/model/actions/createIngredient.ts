'use server'

import { IngredientFormType } from '@/schema/zod'

export async function createIngredient(formData: IngredientFormType) {
  try {
    console.log('created: ', formData)
  } catch (error) {
    console.error('Failed to create ingredient: ', error)
    return { error: 'Failed to create ingredient. Try again later.' }
  }
}
