'use server'

import { prisma } from './prisma'
import { cookies } from 'next/headers'
import * as jose from 'jose'
import { cache } from 'react'

export type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: Date
}

export const getCurrentUser = cache(async () => {
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
    const cookieStore = await cookies()
    cookieStore.delete('token')
    return null
  }
})
