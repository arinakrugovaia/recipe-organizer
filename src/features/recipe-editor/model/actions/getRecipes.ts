'use server'

import prisma from '@/shared/lib/prisma'
import { auth } from '@/features/auth/auth'

export async function getRecipes() {
  try {
    const session = await auth()
    const userId = session?.user?.id || null

    const userRecipes = userId
      ? await prisma.recipe.findMany({
          where: { userId },
          include: {
            ingredients: { include: { ingredient: true } },
            user: { select: { email: true, id: true } },
          },
        })
      : []

    const publicRecipes = await prisma.recipe.findMany({
      where: {
        isPublic: true,
        ...(userId ? { NOT: { userId } } : {}),
      },
      include: {
        ingredients: { include: { ingredient: true } },
        user: { select: { email: true, id: true } },
      },
    })

    return { success: true, userRecipes, publicRecipes }
  } catch (error) {
    console.error('Failed to fetch recipes: ', error)
    return {
      success: false,
      error: 'Could not load recipes. Please try again later.',
    }
  }
}
