import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function ExercisesPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
          >
            ← Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Exercícios</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Exercício</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="exercise-name">Nome do Exercício</Label>
              <Input
                id="exercise-name"
                placeholder="ex: Supino, Agachamento, Deadlift"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="rep-max">Rep Max (kg)</Label>
              <Input
                id="rep-max"
                type="number"
                placeholder="ex: 100"
                min="0"
                step="0.5"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="reps">Número de Repetições</Label>
              <Input
                id="reps"
                type="number"
                placeholder="ex: 1, 3, 5, 10"
                min="1"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="notes">Notas (opcional)</Label>
              <Input
                id="notes"
                placeholder="ex: Com cinto, sem ajuda..."
              />
            </div>

            <Button className="w-full">Adicionar Exercício</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Exercícios Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-center py-8 text-gray-500">
                <p>Nenhum exercício adicionado ainda</p>
                <p className="text-sm">Adicione o seu primeiro exercício!</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Histórico de Exercícios</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Nenhum histórico disponível</p>
            <p className="text-sm">Os seus exercícios aparecerão aqui</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
