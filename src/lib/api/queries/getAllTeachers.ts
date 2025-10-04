import { prisma } from '@/lib/prisma';
import { cache } from 'react';

export const _getAllTeachers = cache(async () => {
  const teachers = await prisma.teacher.findMany({});
  return teachers;
});
