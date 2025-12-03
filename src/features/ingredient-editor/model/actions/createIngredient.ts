'use server'

import { IngredientFormType, ingredientSchema } from '@/schema/zod'
import { ZodError } from 'zod'
import prisma from '@/shared/lib/prisma'

export async function createIngredient(formData: IngredientFormType) {
  try {
    const parsedData = ingredientSchema.parse(formData)
    const ingredient = await prisma.ingredient.create({
      data: {
        name: parsedData.name,
        category: parsedData.category,
        unit: parsedData.unit,
        pricePerUnit: parsedData.pricePerUnit,
        description: parsedData.description,
      },
    })
    return { success: true, ingredient }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        error: error.issues.map((issue) => issue.message).join(', '),
      }
    }
    console.error('Failed to create ingredient: ', error)
    return { error: 'Failed to create ingredient. Try again later.' }
  }
}
