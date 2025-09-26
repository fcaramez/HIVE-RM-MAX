import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function AccountPage() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/')
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
          >
            ← Voltar ao Dashboard
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Configurações da Conta</h1>
      </div>

      <div className="space-y-4">
        {/* Profile Information */}
        <Card>
          <CardHeader>
            <CardTitle>Informações do Perfil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Gerir as suas informações pessoais e preferências da conta.</p>
              <Link href="/dashboard/account/profile">
                <Button className="w-full">Editar Perfil</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Password Change */}
        <Card>
          <CardHeader>
            <CardTitle>Segurança</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Alterar a sua palavra-passe para manter a conta segura.</p>
              <Link href="/dashboard/account/password">
                <Button className="w-full">Alterar Palavra-passe</Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-red-600">Eliminar permanentemente a sua conta e todos os dados associados.</p>
              <Link href="/dashboard/account/delete">
                <Button
                  variant="destructive"
                  className="w-full"
                >
                  Eliminar Conta
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
