'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { clientEnv } from '@/lib/env/client';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useTransition } from 'react';
import { api } from '@/lib/api';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const teacherRegisterFormSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Apelido é obrigatório'),
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(8, 'Palavra-passe tem de ter pelo menos 8 caracteres'),
  teacherPassword: z
    .string()
    .refine(val => val === clientEnv.NEXT_PUBLIC_TEACHER_PASSWORD, 'Palavra-passe de professor incorreta'),
});

export const TeacherRegisterForm = () => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<TeacherFormData>({
    resolver: zodResolver(teacherRegisterFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      teacherPassword: '',
    },
  });

  const onSubmit = (values: TeacherFormData) => {
    const name = `${values.firstName} ${values.lastName}`;
    startTransition(async () => {
      const res = await api.auth.registerTeacher({
        name,
        email: values.email,
        password: values.password,
        teacherPassword: values.teacherPassword,
      });

      if (!res.success) {
        toast.error(res.error);
        return;
      }

      const token = res.data.token;

      setCookie('token', token);

      toast.success(res.message);

      router.push('/dashboard');
    });
  };

  return (
    <Form {...form}>
      <form
        className="space-y-8 w-full"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="space-y-4 mt-6">
          <div className="flex items-center justify-center gap-2 w-full">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="given-name"
                      placeholder="João"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apelido</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="family-name"
                      placeholder="Silva"
                      disabled={loading}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Endereço de email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    autoComplete="email"
                    placeholder="joao@gmail.com"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="teacherPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Palavra-passe de Professor</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="********"
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-2">
          <Button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer"
          >
            {loading ? 'A criar conta...' : 'Criar conta'}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            disabled={loading}
          >
            <Link href="/?type=login">Já tem uma conta? Faça login</Link>
          </Button>
        </div>
      </form>
    </Form>
  );
};
