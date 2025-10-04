import { useTransition } from 'react';
import z from 'zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { setCookie } from 'cookies-next';
import { api } from '@/lib/api';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const registerStudentFormSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Apelido é obrigatório'),
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(8, 'Palavra-passe tem de ter pelo menos 8 caracteres'),
  gender: z.enum(['male', 'female']).refine(val => val !== undefined, {
    message: 'Por favor selecione um género',
  }),
  teacher: z.string().optional(),
});
interface StudentRegisterFormProps {
  teachers: Teacher[];
}

export const StudentRegisterForm = ({ teachers }: StudentRegisterFormProps) => {
  const [loading, startTransition] = useTransition();
  const router = useRouter();
  const form = useForm<StudentFormData>({
    resolver: zodResolver(registerStudentFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      gender: 'male',
      teacher: '',
    },
  });

  const onSubmit = (values: StudentFormData) => {
    const name = `${values.firstName} ${values.lastName}`;
    startTransition(async () => {
      const res = await api.auth.registerStudent({
        name,
        email: values.email,
        password: values.password,
        gender: values.gender,
        teacher: values.teacher,
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
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Género</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex gap-4"
                  >
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="male" />
                      </FormControl>
                      <FormLabel className="font-normal">Homem</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <RadioGroupItem value="female" />
                      </FormControl>
                      <FormLabel className="font-normal">Mulher</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
            name="teacher"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Professor</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione o seu Professor" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-full">
                    {teachers.map(teacher => (
                      <SelectItem
                        key={teacher.id}
                        value={teacher.id}
                      >
                        {teacher.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
