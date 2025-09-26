import { getCurrentUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function DeleteAccountPage() {
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
        <h1 className="text-2xl font-bold text-red-600">Eliminar Conta</h1>
      </div>

      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded">
            <h3 className="font-semibold text-red-800 mb-2">Eliminar Conta</h3>
            <p className="text-red-700 text-sm mb-4">
              Esta ação não pode ser desfeita. Isto irá eliminar permanentemente a sua conta e remover todos os dados
              associados.
            </p>
            <div className="space-y-3">
              <div className="text-sm text-red-700">
                <p className="font-medium">Os seguintes dados serão eliminados:</p>
                <ul className="list-disc list-inside mt-2 space-y-1">
                  <li>Informações do perfil</li>
                  <li>Histórico de atividades</li>
                  <li>Configurações da conta</li>
                  <li>Todos os dados associados</li>
                </ul>
              </div>
              <Button
                variant="destructive"
                className="w-full"
              >
                Eliminar Conta Permanentemente
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
