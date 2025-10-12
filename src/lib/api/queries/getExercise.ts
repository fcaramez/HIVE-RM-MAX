import { prisma } from '@/lib/prisma';
import { redirect } from 'next/navigation';

export const _getExercise = async (exerciseId: string) => {
  let exercise = null;

  exercise = await prisma.strengthExercise.findUnique({
    where: { id: exerciseId },
  });

  if (!exercise) {
    exercise = await prisma.aerobicExercise.findUnique({
      where: { id: exerciseId },
    });
  }

  if (!exercise) {
    return redirect('/dashboard/rm');
  }

  return exercise;
};
