import { Eye, EyeOff } from 'lucide-react'
import { forwardRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'

export const InputPassword = forwardRef<HTMLInputElement>((props, ref) => {

    const [showPassword, setShowPassword] = useState(false)

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const passwordType = showPassword ? 'text' : 'password'
    return (
        <div className="relative group focus-within:before:content-[''] focus-within:before:absolute focus-within:before:left-0 focus-within:before:top-2 focus-within:before:bottom-0 focus-within:before:w-0.5 focus-within:before:bg-primary focus-within:before:rounded-bl-md focus-within:before:z-10 focus-within:before:h-10">
            <Input
                {...props}
                ref={ref}
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
    )
})
InputPassword.displayName = 'InputPassword'
