import { InputPassword } from '@/components/input-password'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/auth-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { createFileRoute, Link, useRouter } from '@tanstack/react-router'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

export const Route = createFileRoute('/login/_layout/')({
    component: RouteComponent,
})

const loginSchema = z.object({
    email: z.string().email('E-mail inválido'),
    password: z.string().min(1, 'A senha é obrigatória'),
    rememberMe: z.boolean().default(false),
})

type LoginForm = z.infer<typeof loginSchema>

function RouteComponent() {
    const navigate = useRouter().navigate
    const { signIn, isAuthenticated } = useAuth()
    useEffect(() => {
        if (isAuthenticated) {
            navigate({ to: '/home' })
        }
    }, [isAuthenticated, navigate])
    const router = useRouter()
    const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<LoginForm>({
        resolver: zodResolver(loginSchema) as any,
        defaultValues: {
            rememberMe: false
        }
    })

    const onSubmit = async (data: LoginForm) => {
        try {
            await signIn({ email: data.email, password: data.password })
            router.navigate({ to: '/home' })
        } catch (error) {
            if (error instanceof AxiosError)
                toast.error('Erro ao fazer login', {
                    description: error.response?.data.message
                })
        }
    }

    return (
        <div className="flex h-full">
            <div className="flex flex-1 justify-center items-center p-2">
                <Card className='w-[400px] h-[500px] max-w-[450px] border-0 shadow-lg bg-card' >
                    <CardHeader>
                        <CardTitle className='text-center text-3xl font-bold text-title dark:text-foreground'>
                            Fazer Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col justify-between h-full'>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 justify-between h-full">
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col gap-[.065rem]">
                                    <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-2 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:rounded-tl-md focus-within:before:z-10 focus-within:before:h-10">
                                        <Input
                                            className="w-full rounded-bl-none rounded-br-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                            placeholder="E-mail"
                                            autoComplete='off'
                                            type="email"
                                            {...register('email')}
                                        />
                                    </div>
                                    {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
                                    <InputPassword {...register('password')} />
                                    {errors.password && <span className="text-xs text-red-500">{errors.password.message}</span>}

                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Controller
                                            name="rememberMe"
                                            control={control}
                                            render={({ field }) => (
                                                <Checkbox
                                                    className="w-5 h-5 text-success border-slate-300"
                                                    id="remember-me"
                                                    checked={field.value}
                                                    onCheckedChange={field.onChange}
                                                />
                                            )}
                                        />
                                        <label htmlFor="remember-me" className="text-sm text-muted-foreground">
                                            Lembre-se de mim
                                        </label>
                                    </div>
                                    <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                                        Esqueci minha senha
                                    </Link>
                                </div>
                                <Button disabled={isSubmitting} type="submit" className="w-full bg-success hover:bg-success/90 text-white h-14 rounded-lg font-semibold text-xl">
                                    {isSubmitting ? 'Entrando...' : 'Entrar'}
                                </Button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col justify-start gap-2">
                                    <span className="text-base text-muted-foreground leading-6">
                                        Não tem uma conta?
                                    </span>
                                    <Link to="/register" className="text-base text-success underline font-medium leading-6">
                                        Cadastre-se
                                    </Link>
                                </div>
                                <span className='text-sm text-muted-foreground leading-6'>É de graça 💜</span>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
