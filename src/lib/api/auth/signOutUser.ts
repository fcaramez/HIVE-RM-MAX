'use server';
import { cookies } from 'next/headers';

export const _signOutUser = async (): Promise<null> => {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('token');

    return null;
  } catch (error) {
    return null;
  }
};
