'use server'

import { IngredientFormType, ingredientSchema } from '@/schema/zod'
import { ZodError } from 'zod'
import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function createIngredient(formData: IngredientFormType) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const parsedData = ingredientSchema.parse(formData)

    const ingredient = await prisma.ingredient.create({
      data: {
        name: parsedData.name,
        category: parsedData.category,
        unit: parsedData.unit,
        pricePerUnit: parsedData.pricePerUnit,
        description: parsedData.description,
        userId: session.user.id,
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
    return {
      success: false,
      error: 'Failed to create ingredient. Try again later.',
    }
  }
}
