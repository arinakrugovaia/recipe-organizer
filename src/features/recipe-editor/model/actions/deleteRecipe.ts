'use server'

import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function deleteRecipe(id: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    const recipe = await prisma.recipe.findFirst({
      where: { id, userId },
    })

    if (!recipe) {
      return { success: false, error: 'Recipe not found' }
    }

    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id },
    })

    const deleted = await prisma.recipe.delete({
      where: { id },
    })

    return { success: true, recipe: deleted }
  } catch (error) {
    console.error('Failed to delete recipe: ', error)
    return {
      success: false,
      error: 'Could not delete recipe. Please try again later.',
    }
  }
}
