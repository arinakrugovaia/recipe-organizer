'use server'

import prisma from '@/shared/lib/prisma'
import { RecipeFormType, recipeSchema } from '@/schema/zod'
import { ZodError } from 'zod'

export async function createRecipe(formData: RecipeFormType) {
  try {
    const parsedData = recipeSchema.parse(formData)
    const recipe = await prisma.recipe.create({
      data: {
        name: parsedData.name,
        description: parsedData.description,
        imageUrl: parsedData.imageUrl,
        ingredients: {
          create: parsedData.ingredients.map(({ ingredientId, quantity }) => ({
            ingredient: { connect: { id: ingredientId } },
            quantity,
          })),
        },
      },
      include: {
        ingredients: {
          include: { ingredient: true },
        },
      },
    })

    return { success: true, recipe }
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error: error.issues.map((issue) => issue.message).join(', '),
      }
    }
    console.error('Failed to create recipe: ', error)
    return {
      success: false,
      error: 'Failed to create recipe. Try again later.',
    }
  }
}
