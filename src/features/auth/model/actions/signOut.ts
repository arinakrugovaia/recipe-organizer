'use server'

import { signOut } from '@/features/auth/auth'
import { useAuthStore } from '@/features/auth/model/auth.store'

export async function signOutUser() {
  try {
    await signOut({ redirect: false })
    useAuthStore.getState().setAuthState('unauthenticated', null)
  } catch (error) {
    console.error('Auth error: ', error)
    throw error
  }
}
