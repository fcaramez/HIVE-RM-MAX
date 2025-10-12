'use server';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import * as jose from 'jose';

export const _registerStudent = async ({
  name,
  email,
  password,
  gender,
  teacher,
  studentNumber,
}: StudentRegisterRequest): Promise<AuthResponse> => {
  try {
    if (!name || !email || !password || !gender || !teacher) {
      return { error: 'Todos os campos são obrigatórios', data: null, success: false };
    }

    if (!studentNumber) {
      return { error: 'Número de aluno é obrigatório', data: null, success: false };
    }

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      return { error: `Utilizador com email ${email} já existe`, data: null, success: false };
    }

    const hashedPassword = await argon2.hash(password);

    const createdUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, gender, teacherId: teacher, studentNumber },
    });

    const payload = {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
      studentNumber: createdUser.studentNumber,
    };

    const token = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    const greeting = createdUser.gender === 'male' ? 'Bem-vindo' : 'Bem-vinda';

    return { message: `${greeting} ${createdUser.name}`, data: { token: token.toString() }, success: true };
  } catch (error) {
    return { error: 'Erro interno do servidor', data: null, success: false };
  }
};
