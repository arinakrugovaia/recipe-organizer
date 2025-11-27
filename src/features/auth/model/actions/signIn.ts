'use server'

import { signIn } from '@/features/auth/auth'

export async function signInWithCredentials(email: string, password: string) {
  try {
    return await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
  } catch (error) {
    console.error('Auth error: ', error)
    throw error
  }
}
