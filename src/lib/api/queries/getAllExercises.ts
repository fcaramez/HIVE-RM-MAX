import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const _getAllExercises = cache(async () => {
  const strengthExercises = await prisma.strengthExercise.findMany({});
  const aerobicExercises = await prisma.aerobicExercise.findMany({});

  return { strengthExercises, aerobicExercises };
});
