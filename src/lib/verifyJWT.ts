import * as jose from 'jose';

type JWTPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export const verifyJWT = async (token: string): Promise<JWTPayload | null> => {
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    throw new Error('JWT_SECRET is not set');
  }

  try {
    const { payload } = await jose.jwtVerify(token, new TextEncoder().encode(jwtSecret));

    const userPayload = payload.payload as JWTPayload;

    if (!userPayload || !userPayload.id || !userPayload.role) {
      return null;
    }

    return userPayload;
  } catch (error) {
    return null;
  }
};
