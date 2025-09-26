import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'

export default async function PasswordPage() {
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
        <h1 className="text-2xl font-bold">Alterar Palavra-passe</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Palavra-passe</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="current-password">Palavra-passe Atual</Label>
            <Input
              id="current-password"
              type="password"
              placeholder="Digite sua palavra-passe atual"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="new-password">Nova Palavra-passe</Label>
            <Input
              id="new-password"
              type="password"
              placeholder="Digite sua nova palavra-passe"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirm-password">Confirmar Nova Palavra-passe</Label>
            <Input
              id="confirm-password"
              type="password"
              placeholder="Confirme sua nova palavra-passe"
            />
          </div>

          <Button className="w-full">Alterar Palavra-passe</Button>
        </CardContent>
      </Card>
    </div>
  )
}
