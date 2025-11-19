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
    distance: z.string().min(1, 'Distância é obrigatória'),
    time: z.string().min(1, 'Tempo é obrigatório'),
  })
  .refine(data => data.distance !== '0' && data.time !== '0', {
    message: 'Tempo e distância são obrigatórios',
  });

const updateRm = async ({ distance, time, rmId }: { distance: number; time: number; rmId: string }) => {
  const res = await api.exercises.updateAerobicRm({
    distance,
    time,
    rmId,
  });

  return res;
};

const createRm = async ({ distance, time, exerciseId }: { distance: number; time: number; exerciseId: string }) => {
  const res = await api.exercises.createAerobicRm({
    distance,
    time,
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
      distance: '0',
      time: '0',
    },
  });

  useEffect(() => {
    startTransition(async () => {
      const userRm = await api.query.getUserAerobicRm(exerciseId);

      if (userRm) {
        form.reset({
          distance: userRm.distance.toString(),
          time: userRm.time.toString(),
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
            distance: parseInt(values.distance),
            time: parseInt(values.time),
            rmId: rmId || '',
          });
        } else {
          res = await createRm({
            distance: parseInt(values.distance),
            time: parseInt(values.time),
            exerciseId,
          });
        }

        if (!res.success) {
          toast.error(res.error);
          return;
        }

        toast.success(res.message);
        router.push(`/dashboard/rm/aerobic/${exerciseId}`);
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
          name="distance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Distância (m)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  name="distance"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tempo (s)</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  name="time"
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
          {isUpdate ? 'Atualizar RM aeróbico' : 'Adicionar RM aeróbico'}
        </Button>
      </form>
    </Form>
  );
};
