import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const _getAllTeachers = cache(async () => {
  const teachers = await prisma.teacher.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return teachers;
});
