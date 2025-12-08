'use server'

import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function getRecipes() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    const recipes = await prisma.recipe.findMany({
      where: { userId },
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
