'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../auth/getCurrentUser';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const _createStrengthRm = async ({
  exerciseId,
  weight,
  reps,
}: {
  exerciseId: string;
  weight: number;
  reps: number;
}) => {
  try {
    const token = (await cookies()).get('token')?.value;
    const user = await getCurrentUser(token || '');

    if (!user) {
      return { error: 'Utilizador não encontrado', data: null, success: false };
    }

    const strengthRm = await prisma.repMaxStrength.create({
      data: {
        userId: user.id,
        strengthExerciseId: exerciseId,
        weight,
        reps,
      },
    });

    // Revalidate relevant paths
    revalidatePath('/dashboard/rm');
    revalidatePath(`/dashboard/rm/strength/${exerciseId}`);

    return { message: 'RM criado com sucesso', data: strengthRm, success: true };
  } catch (error) {
    return { error: 'Erro ao criar RM', data: null, success: false };
  }
};
