'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../auth/getCurrentUser';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const _updateStrengthRm = async ({ weight, reps, rmId }: { weight: number; reps: number; rmId: string }) => {
  try {
    const token = (await cookies()).get('token')?.value;
    const user = await getCurrentUser(token || '');

    if (!user) {
      return { error: 'Utilizador não encontrado', data: null, success: false };
    }

    const strengthRm = await prisma.repMaxStrength.update({
      where: { id: rmId },
      data: {
        weight,
        reps,
      },
    });

    // Revalidate relevant paths
    revalidatePath('/dashboard/rm');
    revalidatePath(`/dashboard/rm/strength/${strengthRm.strengthExerciseId}`);

    return { message: 'RM atualizado com sucesso', data: strengthRm, success: true };
  } catch (error) {
    console.error('Error updating strengthRm: ', error);
    return { error: 'Erro ao atualizar RM', data: null, success: false };
  }
};
