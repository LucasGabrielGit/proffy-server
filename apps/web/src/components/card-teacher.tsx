import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Phone } from 'lucide-react'

export interface TeacherProps {
    id: number
    name: string
    avatar: string
    whatsapp: string
    bio: string
    subject: string
    cost: number
    schedules: {
        week_day: number
        from: string
        to: string
    }[]
}

interface CardTeacherProps {
    teacher: TeacherProps
}

export const CardTeacher = ({ teacher }: CardTeacherProps) => {
    const weekDays = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"]

    return (
        <Card className='shadow-md border overflow-hidden dark:bg-[#3d3c3f]'>
            <CardHeader className='p-8 pb-0'>
                <div className='flex items-center gap-4'>
                    <Avatar className='w-20 h-20'>
                        <AvatarImage src={teacher.avatar} alt={teacher.name} />
                        <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-bold text-[#32264D] dark:text-white'>{teacher.name}</h2>
                        <span className='text-base text-[#6A6180] dark:text-[#9C98A6]'>{teacher.subject}</span>
                    </div>
                </div>
            </CardHeader>

            <CardContent className='p-8'>
                <p className='text-[#6A6180] text-base text-justify leading-7 dark:text-[#9C98A6]'>
                    {teacher.bio}
                </p>

                <div className='mt-8 grid grid-cols-5 gap-4 overflow-x-auto pb-4'>
                    {/* Mocking schedule grid based on the image - 5 days usually Mon-Fri */}
                    {[1, 2, 3, 4, 5].map((day) => {
                        const schedule = teacher.schedules.find(s => s.week_day === day)
                        return (
                            <div key={day} className={`flex flex-col p-4 rounded-lg min-w-[100px] border ${schedule ? 'border-[#E6E6F0] bg-[#FAFAFC]' : 'opacity-40 dark:bg-zinc-50'}`}>
                                <span className={`text-xs font-bold mb-3 text-[#8257E5] ${schedule ? '' : 'dark:text-[#9C98A6]'}`}>Dia</span>
                                <span className='text-base font-bold text-[#6A6180] dark:text-[#2b2a2c] mb-4'>{weekDays[day]}</span>
                                <span className={`text-xs font-bold mb-3 text-[#8257E5] ${schedule ? '' : 'dark:text-[#9C98A6]'}`}>Horário</span>
                                <span className='text-base font-bold text-[#6A6180] dark:text-[#2b2a2c]'>
                                    {schedule ? `${schedule.from} - ${schedule.to}` : '-'}
                                </span>
                            </div>
                        )
                    })}
                </div>

                <div className="flex items-center justify-between mt-6">
                    <div className='flex flex-col'>
                        <span className='text-[#9C98A6] text-sm'>Preço/hora</span>
                        <span className='text-[#8257E5] text-xl font-bold'>R$ {teacher.cost.toFixed(2).replace('.', ',')}</span>
                    </div>
                    <Button className='bg-[#04D361] hover:bg-[#04D361]/90 text-white font-bold h-14 px-8 rounded-lg gap-2'>
                        <Phone className='w-5 h-5 fill-white' />
                        Entrar em contato
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}
