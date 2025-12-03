'use server'

import { RecipeFormType, recipeSchema } from '@/schema/zod'
import prisma from '@/shared/lib/prisma'
import { ZodError } from 'zod'

export async function updateRecipe(id: string, formData: RecipeFormType) {
  try {
    const parsedData = recipeSchema.parse(formData)
    const recipe = await prisma.recipe.update({
      where: { id },
      data: {
        name: parsedData.name,
        description: parsedData.description,
        imageUrl: parsedData.imageUrl,
        ingredients: {
          deleteMany: { recipeId: id },
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
    console.error('Failed to update recipe: ', error)
    return {
      success: false,
      error: 'Failed to update recipe. Try again later.',
    }
  }
}
