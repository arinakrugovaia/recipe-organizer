'use server'

import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function deleteIngredient(id: string) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized' }
    }

    const userId = session.user.id

    const ingredient = await prisma.ingredient.findFirst({
      where: { id, userId },
    })

    if (!ingredient) {
      return { success: false, error: 'Ingredient not found' }
    }

    const deleted = await prisma.ingredient.delete({
      where: { id },
    })
    return { success: true, ingredient: deleted }
  } catch (error) {
    console.error('Failed to delete ingredient: ', error)
    return {
      success: false,
      error: 'Could not delete ingredient. Please try again later.',
    }
  }
}
