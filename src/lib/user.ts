import prisma from '@/lib/prisma'

export async function getUserFromDb(email: string) {
  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  })
  return user
}
