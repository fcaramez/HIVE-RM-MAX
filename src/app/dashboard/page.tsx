import { api } from '@/lib/api';
import { redirect } from 'next/navigation';
import { Dumbbell, TrendingUp, Trophy, User } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

const navigationCards = [
  {
    title: 'Novo RM',
    description: 'Regista ou atualiza os teus RMs',
    icon: Dumbbell,
    href: '/dashboard/rm',
    gradient: 'from-primary/10 to-accent/10',
  },
  {
    title: 'Ver os teus RMs',
    description: 'Vê os teus recordes pessoais',
    icon: TrendingUp,
    href: '/check-rep-max',
    gradient: 'from-accent/10 to-primary/10',
  },
  {
    title: 'Vê a tabela de classificação',
    description: 'Vê como estás classificado contra os outros',
    icon: Trophy,
    href: '/leaderboard',
    gradient: 'from-primary/10 to-accent/10',
  },
  {
    title: 'Gerir a tua conta',
    description: 'Gere a tua conta e as suas configurações',
    icon: User,
    href: '/dashboard/account',
    gradient: 'from-accent/10 to-primary/10',
  },
];

export default async function DashboardPage() {
  const user = await api.auth.getCurrentUser();

  if (!user) {
    redirect('/');
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mb-12 text-center">
          <h1 className="mb-3 font-sans text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Hive Studios RM Tracker
          </h1>
          <p className="text-balance text-lg text-muted-foreground md:text-xl">
            Acompanhe a sua força, compita com outros e alcance os seus objetivos
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {navigationCards.map(card => {
            const Icon = card.icon;
            return (
              <Link
                key={card.href}
                href={card.href}
                className="group"
              >
                <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:border-primary hover:shadow-lg">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                  />
                  <div className="relative p-8">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 p-4 transition-colors duration-300 group-hover:bg-primary/20">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="mb-2 font-sans text-2xl font-bold text-card-foreground">{card.title}</h2>
                    <p className="mb-6 text-muted-foreground">{card.description}</p>
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
