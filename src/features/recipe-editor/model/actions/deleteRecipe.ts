'use server'

import prisma from '@/shared/lib/prisma'

export async function deleteRecipe(id: string) {
  try {
    await prisma.recipeIngredient.deleteMany({
      where: { recipeId: id },
    })

    const recipe = await prisma.recipe.delete({
      where: { id },
    })

    return { success: true, recipe }
  } catch (error) {
    console.error('Failed to delete recipe: ', error)
    return {
      success: false,
      error: 'Could not delete recipe. Please try again later.',
    }
  }
}
