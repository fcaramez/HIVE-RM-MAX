import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateExerciseDialog } from './components/create-exercise-dialog'
export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo, {user.name}!</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Utilizador</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>
              <span className="font-medium">Nome:</span> {user.name}
            </p>
            <p>
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p>
              <span className="font-medium">Função:</span> {user.role}
            </p>
            <p>
              <span className="font-medium">Membro desde:</span> {new Date(user.createdAt).toLocaleDateString('pt-PT')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <CreateExerciseDialog>Adicionar Exercício</CreateExerciseDialog>
            {/* START TODO: Add exercises */}
            <Link
              href="#"
              className="block cursor-not-allowed"
              prefetch={true}
            >
              <Button
                variant="outline"
                className="w-full justify-start"
                disabled={true}
              >
                Ver Exercícios
              </Button>
            </Link>
            {/* END TODO: Add exercises */}
            <Link
              href="/dashboard/account"
              className="block"
              prefetch={true}
            >
              <Button
                variant="outline"
                className="w-full justify-start"
              >
                Configurações da Conta
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
