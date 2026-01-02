import { InputPassword } from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowLeft } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

export const Route = createFileRoute('/register/_layout/')({
  component: RouteComponent,
})

const registerSchema = z.object({
  firstName: z.string().min(1, 'Nome é obrigatório'),
  lastName: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

type RegisterForm = z.infer<typeof registerSchema>

function RouteComponent() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = (data: RegisterForm) => {
    console.log(data)
    // TODO: Implement register logic
  }

  return (
    <Card className='w-full max-w-[400px] border-0 shadow-lg bg-card relative'>
      <Link to="/login" className="absolute left-6 top-2">
        <ArrowLeft className='w-6 h-6 text-primary' />
      </Link>
      <CardHeader className='flex justify-around items-center'>
        <CardTitle className='text-2xl font-bold'>Cadastro</CardTitle>
      </CardHeader>
      <CardContent className='pt-6'>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="flex flex-col gap-[.02rem]">
            <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-3 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:rounded-tl-md focus-within:before:z-10 focus-within:before:h-8" />
            <Input
              className="w-full rounded-bl-none rounded-br-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0 border-slate-300"
              placeholder="Nome"
              type="text"
              {...register('firstName')}
            />

            {errors.firstName && <span className="text-xs text-red-500">{errors.firstName.message}</span>}
          </div>
          <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-3 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:z-10 focus-within:before:h-8" />
          <Input
            className="w-full rounded-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0 border-slate-300"
            placeholder="Sobrenome"
            type="text"
            {...register('lastName')}
          />

          {errors.lastName && <span className="text-xs text-red-500">{errors.lastName.message}</span>}
          <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-3 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:z-10 focus-within:before:h-8">
            <Input
              className="w-full rounded-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0 border-slate-300"
              placeholder="E-mail"
              type="email"
              {...register('email')}
            />

            {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
            <InputPassword {...register('password')} />
            {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}
          </div>

          <Button disabled={isSubmitting} type="submit" className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-white">
            Concluir cadastro
          </Button>
        </form>
      </CardContent>
    </Card >
  )
}