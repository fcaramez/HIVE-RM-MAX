'use server';
import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const _getUserAerobicRm = cache(async (exerciseId: string) => {
  const userRm = await prisma.repMaxAerobic.findFirst({
    where: { aerobicExerciseId: exerciseId },
  });

  return userRm;
});
