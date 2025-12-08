'use server'

import { RecipeFormType, recipeSchema } from '@/schema/zod'
import prisma from '@/shared/lib/prisma'
import { ZodError } from 'zod'
import { auth } from '@/features/auth/auth'

export async function updateRecipe(id: string, formData: RecipeFormType) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    const existingRecipe = await prisma.recipe.findFirst({
      where: { id, userId },
    })
    if (!existingRecipe) {
      return { success: false, error: 'Recipe not found' }
    }

    const parsedData = recipeSchema.parse(formData)

    const ingredientIDs = parsedData.ingredients.map((i) => i.ingredientId)
    const userIngredients = await prisma.ingredient.findMany({
      where: {
        id: { in: ingredientIDs },
        userId,
      },
      select: { id: true },
    })
    if (userIngredients.length !== ingredientIDs.length) {
      return { success: false, error: 'One or more ingredients not found' }
    }

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
