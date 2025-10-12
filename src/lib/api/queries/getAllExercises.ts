import { prisma } from '@/lib/prisma';

export const _getAllExercises = async () => {
  const strengthExercises = await prisma.strengthExercise.findMany({});
  const aerobicExercises = await prisma.aerobicExercise.findMany({});

  return { strengthExercises, aerobicExercises };
};
