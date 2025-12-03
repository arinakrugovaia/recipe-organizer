'use server'

import prisma from '@/shared/lib/prisma'

export async function getRecipes() {
  try {
    const recipes = await prisma.recipe.findMany({
      include: {
        ingredients: {
          include: {
            ingredient: true,
          },
        },
      },
    })
    return { success: true, recipes }
  } catch (error) {
    console.error('Failed to fetch recipes: ', error)
    return {
      success: false,
      error: 'Could not load recipes. Please try again later.',
    }
  }
}
