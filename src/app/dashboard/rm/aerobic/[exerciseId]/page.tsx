import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function AerobicExercisePage({ params }: { params: { exerciseId: string } }) {
  const { exerciseId } = await params;

  const exercise = await api.query.getExercise(exerciseId);
  const userRm = await api.query.getUserAerobicRm(exerciseId);

  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-dvh min-w-dvw">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-4">
          <h1 className="text-2xl font-bold">{exercise.name}</h1>
        </CardHeader>
        <CardContent className="space-y-4">
          {!userRm ? (
            <>
              <p className="text-sm text-muted-foreground">Não foi possível encontrar o RM para este exercício</p>
              <Link
                href={`/dashboard/rm/aerobic/${exerciseId}/add-rm`}
                className="w-full"
                prefetch={true}
              >
                <Button>Adicione seu primeiro RM para este exercício</Button>
              </Link>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              {/* TODO: Add reps table */}
              <RepsTable userRm={userRm} />
              <Link
                href={`/dashboard/rm/aerobic/${exerciseId}/add-rm`}
                className="w-full"
                prefetch={true}
              >
                <Button className="w-full">Atualize o seu RM para este exercício</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
      <Link href="/dashboard/rm/aerobic">
        <Button
          variant="outline"
          size="sm"
        >
          ← Voltar ao RM Aeróbico
        </Button>
      </Link>
    </section>
  );
}
