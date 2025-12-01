'use server'

import prisma from '@/shared/lib/prisma'
import { saltAndHashPassword } from '@/shared/lib/password'
import { SignUpFormType } from '@/schema/zod'

export async function registerUsers(formData: SignUpFormType) {
  const { email, password, confirmPassword } = formData

  if (password !== confirmPassword) {
    return { error: 'Passwords do not match.' }
  }

  if (password.length < 8) {
    return { error: 'Password length must be at least 8 characters.' }
  }

  try {
    const userExist = await prisma.user.findUnique({
      where: { email },
    })
    if (userExist) {
      return { error: 'User with this email address already exists.' }
    }

    const passwordHash = await saltAndHashPassword(password)
    return await prisma.user.create({
      data: {
        email: email,
        password: passwordHash,
      },
    })
  } catch (error) {
    console.error('Registration is failed: ', error)
    return { error: "We couldn't complete your registration. Try again later." }
  }
}
