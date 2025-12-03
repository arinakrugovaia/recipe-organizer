'use server'

import { signIn } from '@/features/auth/auth'

export async function signInWithCredentials(email: string, password: string) {
  try {
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })

    return { success: true, data: result }
  } catch (error) {
    console.error('Auth error: ', error)
    return { error: 'Invalid email or password. Try again.' }
  }
}
