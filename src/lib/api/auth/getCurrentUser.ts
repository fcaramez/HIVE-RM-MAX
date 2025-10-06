'use server';

import { cache } from 'react';
import { cookies } from 'next/headers';

import { prisma } from '@/lib/prisma';
import * as jose from 'jose';

interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  gender?: string;
}

export const _getCurrentUser = cache(async (): Promise<AuthUser | null> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return null;
    }

    let user: Omit<User, 'password'> | Omit<Teacher, 'password'> | null = null;

    const {
      payload: { email, role },
    } = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    if (role === 'professor') {
      user = await prisma.teacher.findFirst({
        where: { email: email as string },
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true },
      });
    } else {
      user = await prisma.user.findFirst({
        where: { email: email as string },
        select: { id: true, name: true, email: true, createdAt: true, updatedAt: true, gender: true },
      });
    }

    if (!user) {
      return null;
    }

    return { ...user, role: role as UserRole };
  } catch {
    return null;
  }
});
