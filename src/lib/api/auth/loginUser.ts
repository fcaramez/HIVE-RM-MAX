'use server';

import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import * as jose from 'jose';
import { cookies } from 'next/headers';

export const _loginUser = async ({ email, password }: LoginRequest): Promise<AuthResponse> => {
  try {
    if (!email || !password) {
      return { error: 'Todos os campos são obrigatórios', data: null, success: false };
    }

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (!userExists) {
      return { error: 'Utilizador não encontrado', data: null, success: false };
    }

    const passwordIsCorrect = await argon2.verify(userExists.password, password);

    if (!passwordIsCorrect) {
      return { error: 'Palavra-passe incorreta', data: null, success: false };
    }

    const payload = {
      id: userExists.id,
      name: userExists.name,
      email: userExists.email,
      role: userExists.role,
    };

    const token = await new jose.SignJWT({ payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    // Set cookie in server action
    const cookieStore = await cookies();
    cookieStore.set('token', token.toString(), {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hour
    });

    const { gender } = userExists;

    const greeting = gender === 'male' ? 'Bem vindo' : 'Bem vinda';

    return { message: `${greeting} ${userExists.name}`, data: { token: token.toString() }, success: true };
  } catch {
    return { error: 'Erro interno do servidor', data: null, success: false };
  }
};
