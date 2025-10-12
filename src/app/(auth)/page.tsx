import { RegisterForm } from './components/register-form';
import { redirect } from 'next/navigation';
import { api } from '@/lib/api';
import { LoginForm } from './components/login-form';

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: 'login' | 'register';
  }>;
}) {
  const { type } = await searchParams;

  const user = await api.auth.getCurrentUser();

  if (user) {
    redirect('/dashboard');
  }

  let teachers: Omit<Teacher, 'password'>[] = [];

  if (type === 'register') {
    teachers = await api.query.getAllTeachers();
  }

  const Component = type === 'register' ? <RegisterForm teachers={teachers} /> : <LoginForm />;

  return <main className="flex items-center justify-center w-dvw h-dvh">{Component}</main>;
}
