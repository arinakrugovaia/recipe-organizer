'use server'

import prisma from '@/shared/lib/prisma'

export async function getIngredients() {
  try {
    const ingredients = await prisma.ingredient.findMany()
    return { success: true, ingredients }
  } catch (error) {
    console.error('Failed to fetch ingredients: ', error)
    return {
      success: false,
      error: 'Could not load ingredients. Please try again later.',
    }
  }
}
