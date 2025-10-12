import * as jose from 'jose';

type JWTPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  const jwtSecret = process.env.JWT_SECRET || process.env.NEXT_PUBLIC_JWT_SECRET;

  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  try {
    const { payload: userPayload } = await jose.jwtVerify(token, new TextEncoder().encode(jwtSecret));

    if (!userPayload || !userPayload.id || !userPayload.role) {
      return null;
    }

    return userPayload as JWTPayload;
  } catch (error) {
    return null;
  }
};
