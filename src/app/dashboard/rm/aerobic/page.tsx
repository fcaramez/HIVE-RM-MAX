import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

// Enable ISR with 1 hour revalidation for aerobic exercises list
export const revalidate = 3600;

export default async function StrengthRMPage() {
  const { aerobicExercises } = await api.query.getAllExercises();

  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-dvh min-w-dvw">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4 flex flex-col items-center justify-center w-full">
          {aerobicExercises.map(exercise => (
            <Link
              key={exercise.id}
              href={`/dashboard/rm/aerobic/${exercise.id}`}
              className="min-w-full"
              prefetch={true}
            >
              <Button className="min-w-full">{exercise.name}</Button>
            </Link>
          ))}

          <Link
            href="/dashboard"
            className="min-w-full"
          >
            <Button
              variant="outline"
              size="sm"
              className="min-w-full"
            >
              ← Voltar ao Dashboard
            </Button>
          </Link>
        </CardContent>
      </Card>
    </section>
  );
}
