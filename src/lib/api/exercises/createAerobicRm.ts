'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../auth/getCurrentUser';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const _createAerobicRm = async ({
  exerciseId,
  distance,
  time,
}: {
  exerciseId: string;
  distance: number;
  time: number;
}) => {
  try {
    const token = (await cookies()).get('token')?.value;
    const user = await getCurrentUser(token || '');

    if (!user) {
      return { error: 'Utilizador não encontrado', data: null, success: false };
    }

    const aerobicRm = await prisma.repMaxAerobic.create({
      data: {
        userId: user.id,
        aerobicExerciseId: exerciseId,
        distance,
        time,
      },
    });

    // Revalidate relevant paths
    revalidatePath('/dashboard/rm');
    revalidatePath(`/dashboard/rm/aerobic/${exerciseId}`);

    return { message: 'RM criado com sucesso', data: aerobicRm, success: true };
  } catch (error) {
    return { error: 'Erro ao criar RM aeróbico', data: null, success: false };
  }
};
