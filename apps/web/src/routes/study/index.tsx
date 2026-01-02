import { CardTeacher, type TeacherProps } from '@/components/card-teacher'
import Header from '@/components/header'
import { InputGroup } from '@/components/input-group'
import { useStudy } from '@/hooks/study/useStudy'
import { createFileRoute } from '@tanstack/react-router'
import smiling from '@/assets/smile.svg'

export const Route = createFileRoute('/study/')({
  component: RouteComponent,
})

const MOCK_TEACHERS: TeacherProps[] = [
  {
    id: 1,
    name: 'Diego Fernandes',
    avatar: 'https://github.com/diego3g.png',
    whatsapp: '123456789',
    bio: 'Entusiasta das melhores tecnologias de química avançada.\n\nApaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.',
    subject: 'Química',
    cost: 20.00,
    schedules: [
      { week_day: 1, from: '8h', to: '18h' },
      { week_day: 2, from: '8h', to: '18h' },
      { week_day: 4, from: '8h', to: '18h' },
    ]
  }
]

function RouteComponent() {
  const { subjects, weekDays } = useStudy()

  return (
    <div className="bg-[#F0F0F7] min-h-screen pb-20">
      <Header title="Estudar" to="/" />

      <div className="bg-[#8257E5] px-4 pt-16 pb-36">
        <div className="max-w-[1120px] mx-auto w-full flex flex-col gap-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-4xl font-bold text-white max-w-[400px] leading-tight">
              Estes são os proffys disponíveis.
            </h2>
            <div className="flex items-center gap-4 text-zinc-200 text-sm">
              <img src={smiling} alt="Smiling" className="w-6 h-6" />
              <p>Nós temos 32 professores.</p>
            </div>
          </div>

          <form className='grid grid-cols-1 md:grid-cols-3 gap-4 items-end'>
            <div className="md:col-span-1">
              <InputGroup label="Matéria" items={subjects} type='select' />
            </div>
            <div className="md:col-span-1">
              <InputGroup label="Dia da Semana" items={weekDays[0]} type='select' />
            </div>
            <div className="md:col-span-1">
              <InputGroup label="Horário" type='input' />
            </div>
          </form>
        </div>
      </div>

      <div className="max-w-[740px] mx-auto w-full px-4 -mt-16 flex flex-col gap-6">
        {MOCK_TEACHERS.map(teacher => (
          <CardTeacher key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  )
}
