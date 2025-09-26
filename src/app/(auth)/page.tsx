import { getCurrentUser } from '@/lib/auth'
import { LoginForm } from './components/login-form'
import { RegisterForm } from './components/register-form'
import { redirect } from 'next/navigation'

export default async function AuthPage({
  searchParams,
}: {
  searchParams: Promise<{
    type: 'login' | 'register'
  }>
}) {
  const { type } = await searchParams

  const user = await getCurrentUser()

  if (user) {
    redirect('/dashboard')
  }

  const Component = type === 'register' ? RegisterForm : LoginForm

  return (
    <main className="flex items-center justify-center w-dvw h-dvh">
      <Component />
    </main>
  )
}
