'use server';

import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import { verifyJWT } from '@/lib/verifyJWT';
import { cookies } from 'next/headers';

export const _editProfile = async ({
  name,
  email,
  password,
  teacherId,
}: {
  name: string;
  email: string;
  password: string;
  teacherId: string;
}): Promise<
  | {
      message: string;
      success: true;
    }
  | {
      error: string;
      success: false;
    }
> => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;

    if (!token) {
      return { error: 'Não autorizado', success: false };
    }

    const currentUser = await verifyJWT(token);

    if (!currentUser) {
      return { error: 'Não autorizado', success: false };
    }

    if (currentUser.role === 'professor') {
      if (email !== currentUser.email) {
        const emailExists = await prisma.teacher.findFirst({
          where: { email },
        });

        if (emailExists) {
          return { error: `Email ${email} já está em uso`, success: false };
        }
      }
      const updateTeacherData: {
        name: string;
        email: string;
        password?: string;
      } = {
        name,
        email,
      };

      if (password) {
        updateTeacherData.password = await argon2.hash(password);
      }

      await prisma.teacher.update({
        where: { id: currentUser.id },
        data: updateTeacherData,
      });

      return { message: 'Perfil atualizado com sucesso', success: true };
    } else if (currentUser.role === 'aluno') {
      if (email !== currentUser.email) {
        const emailExists = await prisma.user.findFirst({
          where: { email },
        });

        if (emailExists) {
          return { error: `Email ${email} já está em uso`, success: false };
        }
      }
    } else {
      return { error: 'Não autorizado', success: false };
    }

    const updateUserData: {
      name: string;
      email: string;
      password?: string;
      teacherId?: string;
    } = {
      name,
      email,
      teacherId,
    };

    if (password) {
      updateUserData.password = await argon2.hash(password);
    }

    await prisma.user.update({
      where: { id: currentUser.id },
      data: updateUserData,
    });

    return { message: 'Perfil atualizado com sucesso', success: true };
  } catch (error) {
    return { error: 'Erro interno do servidor', success: false };
  }
};
