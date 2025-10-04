import z from 'zod';

const serverEnvSchema = z.object({
  JWT_SECRET: z.string(),
  DATABASE_URL: z.string(),
});

const serverEnvData = serverEnvSchema.safeParse({
  JWT_SECRET: process.env.JWT_SECRET,
  DATABASE_URL: process.env.DATABASE_URL,
});

if (!serverEnvData.success) {
  const errorMessage = '❌ Invalid SERVER environment variables';
  throw new Error(errorMessage);
}

export const serverEnv = serverEnvData.data;
