'use server'

import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function getIngredients() {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    const ingredients = await prisma.ingredient.findMany({
      where: { userId },
    })
    return { success: true, ingredients }
  } catch (error) {
    console.error('Failed to fetch ingredients: ', error)
    return {
      success: false,
      error: 'Could not load ingredients. Please try again later.',
    }
  }
}
