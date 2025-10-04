import { z } from 'zod';

const clientSchema = z.object({
  NEXT_PUBLIC_TEACHER_PASSWORD: z.string(),
});

const clientEnvData = clientSchema.safeParse({
  NEXT_PUBLIC_TEACHER_PASSWORD: process.env.NEXT_PUBLIC_TEACHER_PASSWORD,
});

if (!clientEnvData.success) {
  const errorMessage = '❌ Invalid CLIENT environment variables';
  throw new Error(errorMessage);
}

export const clientEnv = clientEnvData.data;
