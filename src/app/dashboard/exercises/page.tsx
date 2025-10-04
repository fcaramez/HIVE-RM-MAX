import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { api } from '@/lib/api';

export default async function ExercisesPage() {
  const user = await api.auth.getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-6">
        <Link
          href="/dashboard"
          prefetch={true}
        >
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
  );
}
