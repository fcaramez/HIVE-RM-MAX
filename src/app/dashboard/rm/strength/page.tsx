import { api } from '@/lib/api';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';

export default async function StrengthRMPage() {
  const { strengthExercises } = await api.query.getAllExercises();

  const coreExercises = strengthExercises.filter(exercise => exercise.category === 'core');
  const auxiliaryExercises = strengthExercises.filter(exercise => exercise.category === 'auxiliary');

  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-dvh min-w-dvw">
      <Card className="w-full max-w-sm">
        <CardContent className="space-y-4">
          <Tabs defaultValue="core">
            <TabsList className="w-full">
              <TabsTrigger
                value="core"
                className="w-full cursor-pointer"
              >
                Core
              </TabsTrigger>
              <TabsTrigger
                value="auxiliary"
                className="w-full cursor-pointer"
              >
                Auxiliar
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="core"
              className="space-y-4 flex flex-col items-center justify-center w-full"
            >
              {coreExercises.map(exercise => (
                <Link
                  key={exercise.id}
                  href={`/dashboard/rm/strength/${exercise.id}`}
                  className="min-w-full"
                >
                  <Button className="min-w-full ">{exercise.name}</Button>
                </Link>
              ))}
            </TabsContent>
            <TabsContent
              value="auxiliary"
              className="space-y-4 flex flex-col items-center justify-center w-full"
            >
              {auxiliaryExercises.map(exercise => (
                <Link
                  key={exercise.id}
                  href={`/dashboard/rm/strength/${exercise.id}`}
                  className="min-w-full"
                >
                  <Button className="min-w-full ">{exercise.name}</Button>
                </Link>
              ))}
            </TabsContent>
          </Tabs>
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
