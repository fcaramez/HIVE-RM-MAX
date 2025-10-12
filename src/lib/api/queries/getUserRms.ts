'use server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '../auth/getCurrentUser';
import { cookies } from 'next/headers';

export const _getUserRms = async () => {
  const token = (await cookies()).get('token')?.value;
  const user = await getCurrentUser(token || '');

  if (!user) {
    return { strengthRms: [], aerobicRms: [] };
  }

  const strengthRms = await prisma.repMaxStrength.findMany({
    where: { userId: user.id },
  });

  const aerobicRms = await prisma.repMaxAerobic.findMany({
    where: { userId: user.id },
  });

  return { strengthRms, aerobicRms };
};
