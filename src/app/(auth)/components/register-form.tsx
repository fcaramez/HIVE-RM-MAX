'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import z from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { toast } from 'sonner'
import { setCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const registerFormSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Apelido é obrigatório'),
  email: z.string().email('Endereço de email inválido'),
  password: z.string().min(8, 'Palavra-passe tem de ter pelo menos 8 caracteres'),
})

export function RegisterForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    },
  })

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      setIsLoading(true)
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: `${values.firstName} ${values.lastName}`,
          email: values.email,
          password: values.password,
        }),
      })

      const data = await res.json()

      if (!data.success) {
        toast.error(data.error, {
          position: 'top-center',
        })
        return
      }

      const token = data.data.token

      setCookie('token', token)

      toast.success(data.message, {
        position: 'top-center',
      })

      router.push('/dashboard')
    } catch (error) {
      toast.error('Erro interno do servidor', {
        position: 'top-center',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Crie uma conta para continuar</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            className="space-y-8 w-full"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-center gap-2 w-full">
                <div className="grid gap-2">
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
                            required
                            placeholder="João"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-2">
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
                            required
                            placeholder="Silva"
                            disabled={isLoading}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
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
                          autoComplete="email"
                          required
                          placeholder="joao@gmail.com"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
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
                          autoComplete="new-password"
                          placeholder="********"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? 'A criar conta...' : 'Criar conta'}
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isLoading}
              >
                <Link href="/?type=login">Já tem uma conta? Entrar</Link>
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
