'use server'

import { signOut } from '@/features/auth/auth'

export async function signOutUser() {
  try {
    return await signOut({ redirect: false })
  } catch (error) {
    console.error('Auth error: ', error)
    throw error
  }
}
