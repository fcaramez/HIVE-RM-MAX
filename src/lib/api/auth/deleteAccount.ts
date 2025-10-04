'use server';

import { prisma } from '@/lib/prisma';

import { verifyJWT } from '@/lib/verifyJWT';
import { cookies } from 'next/headers';

export const _deleteAccount = async (): Promise<
  | {
      success: true;
      message: string;
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

    const user = await verifyJWT(token);

    if (!user) {
      return { error: 'Não autorizado', success: false };
    }

    if (user.role === 'aluno') {
      await prisma.user.delete({
        where: { id: String(user.id) },
      });
    } else if (user.role === 'professor') {
      await prisma.teacher.delete({
        where: { id: String(user.id) },
      });
    } else {
      return { error: 'Tipo de utilizador inválido', success: false };
    }

    cookieStore.delete('token');

    return { success: true, message: 'Conta eliminada com sucesso' };
  } catch (error) {
    console.error('Error deleting account:', error);
    return { error: 'Erro ao eliminar conta', success: false };
  }
};
