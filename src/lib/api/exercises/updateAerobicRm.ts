'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../auth/getCurrentUser';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export const _updateAerobicRm = async ({ distance, time, rmId }: { distance: number; time: number; rmId: string }) => {
  try {
    const token = (await cookies()).get('token')?.value;
    const user = await getCurrentUser(token || '');

    if (!user) {
      return { error: 'Utilizador não encontrado', data: null, success: false };
    }

    const aerobicRm = await prisma.repMaxAerobic.update({
      where: { id: rmId },
      data: {
        distance,
        time,
      },
    });

    // Revalidate relevant paths
    revalidatePath('/dashboard/rm');
    revalidatePath(`/dashboard/rm/aerobic/${aerobicRm.aerobicExerciseId}`);

    return { message: 'RM atualizado com sucesso', data: aerobicRm, success: true };
  } catch (error) {
    console.error('Error updating aerobicRm: ', error);
    return { error: 'Erro ao atualizar RM', data: null, success: false };
  }
};
