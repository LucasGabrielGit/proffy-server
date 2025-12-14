import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { createFileRoute, Link } from '@tanstack/react-router'
import { Eye, EyeOff, Heart } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/login/')({
    component: RouteComponent,
})

function RouteComponent() {

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const passwordType = showPassword ? 'text' : 'password'

    return (
        <div className="flex h-full">
            <div className="flex flex-1 justify-center bg-[#F0F0F7] dark:bg-[#121214] items-center p-2">
                <Card className='w-[400px] h-[500px] max-w-[450px] border-0 shadow-lg bg-card' >
                    <CardHeader>
                        <CardTitle className='text-center text-3xl font-bold text-title dark:text-foreground'>
                            Fazer Login
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col justify-between h-full'>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-[.065rem]">
                                <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-2 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:rounded-tl-md focus-within:before:z-10 focus-within:before:h-10">
                                    <Input
                                        className="w-full rounded-bl-none rounded-br-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="E-mail"
                                        type="email"
                                    />
                                </div>
                                <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-2 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:rounded-bl-md focus-within:before:z-10 focus-within:before:h-10">
                                    <Input
                                        className="w-full rounded-tl-none rounded-tr-none h-14 bg-input pl-4 focus-visible:ring-0 focus-visible:ring-offset-0"
                                        placeholder="Senha"
                                        type={passwordType}
                                    />
                                    <Button
                                        onClick={togglePasswordVisibility}
                                        variant={'ghost'}
                                        type="button"
                                        className='absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer hover:bg-transparent z-20'
                                    >
                                        {showPassword ? <EyeOff className="w-6 text-muted-foreground" /> : <Eye className="w-6 text-muted-foreground" />}
                                    </Button>
                                </div>

                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        className="w-5 h-5 text-success border-slate-300"
                                        id="remember-me"
                                    />
                                    <label htmlFor="remember-me" className="text-sm text-muted-foreground">
                                        Lembre-se de mim
                                    </label>
                                </div>
                                <Link to="/forgot-password" className="text-sm text-muted-foreground hover:underline">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <Button className="w-full h-14 text-lg font-semibold bg-success hover:bg-success/90 text-white">
                                Entrar
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
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
