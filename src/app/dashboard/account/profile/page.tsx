import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function ProfilePage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard/account">
          <Button
            variant="outline"
            size="sm"
          >
            ← Voltar
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Editar Perfil</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informações do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              id="name"
              defaultValue={user.name}
              placeholder="Seu nome completo"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              defaultValue={user.email}
              placeholder="seu@email.com"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="role">Função</Label>
            <Input
              id="role"
              defaultValue={user.role}
              disabled
              className="bg-gray-50"
            />
          </div>

          <Button className="w-full">Guardar Alterações</Button>
        </CardContent>
      </Card>
    </div>
  )
}
