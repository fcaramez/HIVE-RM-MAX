'use server'

import { prisma } from './prisma'
import { cookies } from 'next/headers'
import * as jose from 'jose'

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return null
    }

    const {
      payload: { email },
    } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    const user = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return user
  } catch (error) {
    console.error('Error getting current user:', error)
    return null
  }
}
