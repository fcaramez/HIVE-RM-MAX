'use client';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useEffect, useTransition, useState } from 'react';
import z from 'zod';
import { api } from '@/lib/api';

import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

const addRmFormSchema = z
  .object({
    weight: z.string().min(1, 'Peso é obrigatório'),
    reps: z.string().min(1, 'Repetições são obrigatórias'),
  })
  .refine(data => data.weight !== '0' && data.reps !== '0', {
    message: 'Peso e repetições são obrigatórios',
  });

const updateRm = async ({ weight, reps, rmId }: { weight: number; reps: number; rmId: string }) => {
  const res = await api.exercises.updateStrengthRm({
    weight,
    reps,
    rmId,
  });

  return res;
};

const createRm = async ({ weight, reps, exerciseId }: { weight: number; reps: number; exerciseId: string }) => {
  const res = await api.exercises.createStrengthRm({
    weight,
    reps,
    exerciseId,
  });

  return res;
};

export const AddRmForm = ({ exerciseId }: { exerciseId: string }) => {
  const [loading, startTransition] = useTransition();
  const [isUpdate, setIsUpdate] = useState(false);
  const [rmId, setRmId] = useState<string | null>(null);
  const router = useRouter();
  const form = useForm<z.infer<typeof addRmFormSchema>>({
    resolver: zodResolver(addRmFormSchema),
    defaultValues: {
      weight: '0',
      reps: '0',
    },
  });

  useEffect(() => {
    startTransition(async () => {
      const userRm = await api.query.getUserStrengthRm(exerciseId);

      if (userRm) {
        form.reset({
          weight: userRm.weight.toString(),
          reps: userRm.reps.toString(),
        });
        setIsUpdate(true);
        setRmId(userRm.id);
      }
    });
  }, []);

  console.log('rmId', rmId);

  function onSubmit(values: z.infer<typeof addRmFormSchema>) {
    try {
      startTransition(async () => {
        let res;

        if (isUpdate) {
          res = await updateRm({
            weight: parseInt(values.weight),
            reps: parseInt(values.reps),
            rmId: rmId || '',
          });
        } else {
          res = await createRm({
            weight: parseInt(values.weight),
            reps: parseInt(values.reps),
            exerciseId,
          });
        }

        if (!res.success) {
          toast.error(res.error);
          return;
        }

        toast.success(res.message);
        router.push(`/dashboard/rm/strength/${exerciseId}`);
      });
    } catch (error) {
      console.error('Error decoding token: ', error);
      toast.error('Erro ao decodificar token');
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Peso (KG)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  name="weight"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reps"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Repetições</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  name="reps"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loading}
        >
          {isUpdate ? 'Atualizar RM' : 'Adicionar RM'}
        </Button>
      </form>
    </Form>
  );
};
