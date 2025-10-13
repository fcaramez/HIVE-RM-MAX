'use server';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const _getUserStrengthRm = cache(async (exerciseId: string) => {
  const userRm = await prisma.repMaxStrength.findFirst({
    where: { strengthExerciseId: exerciseId },
  });

  return userRm;
});
