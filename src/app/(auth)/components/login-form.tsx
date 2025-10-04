'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';

const loginFormSchema = z.object({
  email: z.email('Endereço de email inválido'),
  password: z.string().min(8, 'Palavra-passe tem de ter pelo menos 8 caracteres'),
});

export function LoginForm() {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    startTransition(async () => {
      try {
        const res = await api.auth.loginUser({
          email: values.email,
          password: values.password,
        });

        if (!res.success) {
          toast.error(res.error, {
            position: 'top-center',
          });
          return;
        }

        const token = res.data.token;

        setCookie('token', token);

        toast.success(res.message, {
          position: 'top-center',
        });

        router.push('/dashboard');
      } catch (error) {
        toast.error('Erro interno do servidor', {
          position: 'top-center',
        });
      }
    });
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Faça login para continuar</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-8 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Endereço de email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="joao@gmail.com"
                          required
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Palavra-passe</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="********"
                          required
                          disabled={loading}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={loading}
              >
                {loading ? 'A fazer login...' : 'Fazer login'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={loading}
              >
                <Link href="/?type=register">Não tem uma conta? Criar conta</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
