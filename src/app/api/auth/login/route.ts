import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import argon2 from 'argon2'
import * as jose from 'jose'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios', data: null, success: false },
        { status: 400 },
      )
    }

    const checkIfUserExists = await prisma.user.findFirst({
      where: { email },
    })

    if (!checkIfUserExists) {
      return NextResponse.json({ error: 'Utilizador não encontrado', data: null, success: false }, { status: 400 })
    }

    const checkIfPasswordIsCorrect = await argon2.verify(checkIfUserExists.password, password)

    if (!checkIfPasswordIsCorrect) {
      return NextResponse.json({ error: 'Palavra-passe incorreta', data: null, success: false }, { status: 400 })
    }

    const payload = {
      id: checkIfUserExists.id,
      name: checkIfUserExists.name,
      email: checkIfUserExists.email,
      role: checkIfUserExists.role,
    }

    const token = await new jose.SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET))

    return NextResponse.json(
      { message: `Bem vindo/a ${checkIfUserExists.name}`, data: { token: token.toString() }, success: true },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error', data: null, success: false }, { status: 500 })
  }
}
