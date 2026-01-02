import { Button } from '@/components/ui/button'
import { createFileRoute, Link } from '@tanstack/react-router'
import { BookOpen, Check, GraduationCap, Lightbulb, Users } from 'lucide-react'

export const Route = createFileRoute('/register-success/')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen w-full flex-col justify-center items-center bg-primary p-10 text-primary-foreground overflow-hidden relative">

      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 opacity-20 transform rotate-12">
        <BookOpen size={120} />
      </div>
      <div className="absolute bottom-20 right-20 opacity-20 transform -rotate-12">
        <GraduationCap size={140} />
      </div>
      <div className="absolute top-1/4 right-10 opacity-10">
        <Lightbulb size={80} />
      </div>
      <div className="absolute bottom-1/4 left-20 opacity-10">
        <Users size={100} />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <div className="max-w-xl space-y-8 z-10 text-center relative flex flex-col items-center">
        <div className="relative inline-flex items-center justify-center p-6 border-4 border-green-400 rounded-3xl mb-4">
          <Check size={64} className="text-green-400 stroke-3" />
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl font-bold tracking-tight">Cadastro concluído</h1>
          <p className="text-xl font-light text-primary-foreground/90 max-w-lg mx-auto leading-relaxed">
            Agora você faz parte da plataforma da Nexu. <br />
            Tenha uma ótima experiência.
          </p>
        </div>

        <Link to="/login">
          <Button className="w-48 h-14 text-lg font-semibold bg-green-500 hover:bg-green-600 text-white mt-8">
            Fazer login
          </Button>
        </Link>
      </div>
    </div>
  )
}
