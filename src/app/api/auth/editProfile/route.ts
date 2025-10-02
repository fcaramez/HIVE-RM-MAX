import { prisma } from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'
import argon2 from 'argon2'

export async function PUT(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()

    const currentUser = await getCurrentUser()
    if (!currentUser) {
      return NextResponse.json({ error: 'Utilizador não autenticado', success: false }, { status: 401 })
    }

    if (email !== currentUser.email) {
      const emailExists = await prisma.user.findFirst({
        where: { email },
      })

      if (emailExists) {
        return NextResponse.json({ error: `Email ${email} já está em uso`, success: false }, { status: 400 })
      }
    }

    const updateData: {
      name: string
      email: string
      password?: string
    } = {
      name,
      email,
    }

    if (password) {
      updateData.password = await argon2.hash(password)
    }

    const updatedUser = await prisma.user.update({
      where: { id: currentUser.id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    return NextResponse.json(
      {
        message: 'Perfil atualizado com sucesso',
        data: updatedUser,
        success: true,
      },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json({ error: 'Erro interno do servidor', success: false }, { status: 500 })
  }
}
