'use server'

import prisma from '@/shared/lib/prisma'

export async function deleteIngredient(id: string) {
  try {
    const ingredient = await prisma.ingredient.delete({
      where: { id },
    })
    return { success: true, ingredient }
  } catch (error) {
    console.error('Failed to delete ingredient: ', error)
    return {
      success: false,
      error: 'Could not delete ingredient. Please try again later.',
    }
  }
}
