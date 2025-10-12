'use server';
import { prisma } from '@/lib/prisma';

export const _getUserStrengthRm = async (exerciseId: string) => {
  const userRm = await prisma.repMaxStrength.findFirst({
    where: { strengthExerciseId: exerciseId },
  });

  return userRm;
};
