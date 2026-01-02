import { createFileRoute, Outlet } from '@tanstack/react-router'
import { BookOpen, GraduationCap, Lightbulb, Users } from 'lucide-react'

export const Route = createFileRoute('/register/_layout')({
    component: RouteComponent,
})

function RouteComponent() {
    return <div className="flex h-screen w-full overflow-hidden">
        <div className="flex w-full flex-col justify-center items-center p-8 lg:w-1/2 bg-background relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-primary lg:hidden" />
            <Outlet />
        </div>
        <div className="hidden relative w-1/2 flex-col justify-center items-center bg-primary p-10 text-primary-foreground lg:flex overflow-hidden">

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

            <div className="max-w-md space-y-6 z-10 text-center relative">
                <div className="inline-block p-4 bg-white/10 backdrop-blur-sm rounded-2xl mb-4 shadow-xl border border-white/20">
                    <BookOpen size={64} className="text-white" />
                </div>
                <h1 className="text-7xl font-bold tracking-tight">Nexu</h1>
                <p className="text-2xl font-light text-primary-foreground/90 max-w-sm mx-auto leading-relaxed">
                    Sua plataforma de estudos online. <br />
                    <span className="font-medium">Onde o conhecimento se conecta.</span>
                </p>
            </div>
        </div>
    </div>
}
