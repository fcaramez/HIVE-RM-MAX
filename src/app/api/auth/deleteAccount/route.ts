import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import * as jose from 'jose'
import { cookies } from 'next/headers'

export async function DELETE() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
    }

    const {
      payload: { email },
    } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET))

    const user = await prisma.user.findFirst({
      where: { email: email as string },
      select: { id: true, email: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'Utilizador não encontrado' }, { status: 404 })
    }

    await prisma.user.delete({
      where: { id: user.id },
    })

    cookieStore.delete('token')

    return NextResponse.json({ message: 'Conta eliminada com sucesso' })
  } catch (error) {
    console.error('Error deleting account:', error)

    if (error instanceof jose.errors.JWTExpired || error instanceof jose.errors.JWTInvalid) {
      return NextResponse.json({ error: 'Token inválido' }, { status: 401 })
    }

    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 })
  }
}
