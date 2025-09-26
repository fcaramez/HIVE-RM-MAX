import { prisma } from '@/lib/prisma'
import argon2 from 'argon2'
import { NextRequest, NextResponse } from 'next/server'
import * as jose from 'jose'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios', data: null, success: false },
        { status: 400 },
      )
    }

    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    if (userExists) {
      return NextResponse.json(
        { error: `Utilizador com email ${email} já existe`, data: null, success: false },
        { status: 400 },
      )
    }

    const hashedPassword = await argon2.hash(password)

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    })

    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }

    const token = await new jose.SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return NextResponse.json(
      { message: `Bem-vindo ${user.name}`, data: { token: token.toString() }, success: true },
      { status: 201 },
    )
  } catch (_error) {
    return NextResponse.json({ error: 'Internal server error', data: null, success: false }, { status: 500 })
  }
}
