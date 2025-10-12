import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AddRmForm } from './components/add-rm-form';
import { api } from '@/lib/api';

export default async function AddRmPage({ params }: { params: { exerciseId: string } }) {
  const { exerciseId } = await params;

  const exercise = await api.query.getExercise(exerciseId);

  return (
    <section className="flex flex-col gap-4 items-center justify-center min-h-dvh min-w-dvw">
      <Card className="w-full max-w-sm p-4">
        <CardHeader>
          <CardTitle>Adicione seu primeiro RM para o {exercise.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <AddRmForm exerciseId={exerciseId} />
        </CardContent>
      </Card>
    </section>
  );
}
