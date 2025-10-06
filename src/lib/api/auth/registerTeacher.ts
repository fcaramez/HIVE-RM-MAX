'use server';
import { prisma } from '@/lib/prisma';
import argon2 from 'argon2';
import * as jose from 'jose';

export const _registerTeacher = async ({
  name,
  email,
  password,
  teacherPassword,
}: TeacherRegisterRequest): Promise<AuthResponse> => {
  try {
    if (!name || !email || !password || !teacherPassword) {
      return { error: 'Todos os campos são obrigatórios', data: null, success: false };
    }

    const teacherExists = await prisma.teacher.findFirst({
      where: { email },
    });

    if (teacherExists) {
      return { error: `Professor com email ${email} já existe`, data: null, success: false };
    }

    const hashedPassword = await argon2.hash(password);

    const createdTeacher = await prisma.teacher.create({
      data: { name, email, password: hashedPassword },
    });

    const payload = {
      id: createdTeacher.id,
      name: createdTeacher.name,
      email: createdTeacher.email,
      role: 'professor',
    };

    const token = await new jose.SignJWT({ ...payload })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(process.env.JWT_SECRET));

    return { message: `Bem-vindo/a ${createdTeacher.name}`, data: { token: token.toString() }, success: true };
  } catch (error) {
    return { error: 'Erro interno do servidor', data: null, success: false };
  }
};
