import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { DeleteAccountDialog } from './components/delete-account-dialog';
import { api } from '@/lib/api';

export default async function AccountPage() {
  const user = await api.auth.getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto flex flex-col items-center w-full gap-4">
      <div className="flex flex-col items-center gap-4 mb-6">
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

        {/* Danger Zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm text-red-600">Eliminar permanentemente a sua conta e todos os dados associados.</p>
              <DeleteAccountDialog>Eliminar Conta</DeleteAccountDialog>
            </div>
          </CardContent>
        </Card>
      </div>
      <Link href="/dashboard">
        <Button
          variant="outline"
          size="sm"
        >
          ← Voltar ao Dashboard
        </Button>
      </Link>
    </div>
  );
}
