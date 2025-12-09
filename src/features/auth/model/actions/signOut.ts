'use server'

import { signOut } from '@/features/auth/auth'

export async function signOutUser() {
  try {
    await signOut({ redirect: true })
  } catch (error) {
    console.error('Auth error: ', error)
    throw error
  }
}
