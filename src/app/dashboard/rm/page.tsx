import { Card } from '@/components/ui/card';
import { CircleGauge, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';

export default async function RMPage() {
  const { strengthRms, aerobicRms } = await api.query.getUserRms();
  const { strengthExercises, aerobicExercises } = await api.query.getAllExercises();

  return (
    <section className="flex flex-col gap-4 h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 ">
        <Link
          href={'/dashboard/rm/strength'}
          className="p-4 w-full"
        >
          <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                <Dumbbell className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 font-sans text-2xl font-bold text-card-foreground">Força</h2>
              <p className="mb-6 text-muted-foreground">
                {strengthRms.length}/{strengthExercises.length} de exercícios registados
              </p>
            </div>
          </Card>
        </Link>
        <Link
          href={'/dashboard/rm/aerobic'}
          className="p-4 w-full"
        >
          <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
            <div
              className={`absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
            />
            <div className="relative p-8">
              <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                <CircleGauge className="h-8 w-8 text-primary" />
              </div>
              <h2 className="mb-2 font-sans text-2xl font-bold text-card-foreground">Aeróbio</h2>
              <p className="mb-6 text-muted-foreground">
                {aerobicRms.length}/{aerobicExercises.length} de exercícios registados
              </p>
            </div>
          </Card>
        </Link>
        <Link href="/dashboard">
          <Button
            variant="outline"
            size="sm"
          >
            ← Voltar ao Dashboard
          </Button>
        </Link>
      </div>
    </section>
  );
}
