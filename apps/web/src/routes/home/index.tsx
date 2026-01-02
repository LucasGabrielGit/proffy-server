import { ModeToggle } from "@/components/mode-toggle";
import { useAuth } from "@/contexts/auth-context";
import api from "@/lib/api";
import { createFileRoute, Link, redirect } from '@tanstack/react-router';
import { BookOpen, Heart, Monitor, Power } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import logo from "../../assets/Ilustra.svg";

export const Route = createFileRoute('/home/')({
    component: RouteComponent,
    beforeLoad(ctx) {
        const { isAuthenticated } = ctx.context.auth
        if (!isAuthenticated) {
            throw redirect({ to: "/login" })
        }
    },
})

function RouteComponent() {
    const { user, signOut, token } = useAuth();
    const [totalConnections, setTotalConnections] = useState(0);

    const loadConnections = useCallback(async () => {
        if (!token) return;
        try {
            const response = await api.get("/connections", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setTotalConnections(response.data.total)
        } catch (error) {
            console.error("Failed to load connections", error);
        }
    }, [token])

    useEffect(() => {
        loadConnections()
    }, [loadConnections])


    return (
        <div className="flex flex-col h-full">
            <div className="bg-primary h-[670px] flex flex-col px-4 md:px-0 sm:px-10">
                <header className="w-full max-w-[1100px] mx-auto flex justify-between items-center py-6 text-primary-foreground sm:py-10">
                    <div className="flex items-center gap-4">
                        <img
                            src={user?.avatar || "https://github.com/shadcn.png"}
                            alt={user?.name || "User"}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                        <span className="font-medium text-sm">
                            {user?.name || "Visitante"}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={signOut}
                            className="bg-primary-foreground/20 p-2 rounded-lg hover:bg-primary-foreground/30 transition-colors"
                            type="button"
                        >
                            <Power className="w-5 h-5 text-primary-foreground" />
                        </button>
                        <ModeToggle />
                    </div>
                </header>

                <div className="flex-1 w-full max-w-[1100px] mx-auto sm:items-start flex flex-col md:flex-row items-center justify-between gap-8 py-10">
                    <div className="flex flex-col gap-2 w-[450px]">
                        <h1 className="text-6xl md:text-7xl font-bold text-primary-foreground tracking-tight">
                            Nexu
                        </h1>
                        <p className="text-primary-foreground/80 text-xl md:text-2xl w-[350px] leading-relaxed">
                            Sua plataforma de estudos online.
                        </p>
                        <p className="font-medium text-primary-foreground/80 text-xl md:text-2xl">Onde o conhecimento se conecta.</p>
                    </div>

                    <div className="w-full max-w-[600px]">
                        <img
                            src={logo}
                            alt="Plataforma de estudos"
                            className="w-full h-auto"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-background py-10 md:py-14 px-4 md:px-0 sm:px-10 align-middle">
                <div className="w-full max-w-[1100px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex flex-col gap-1 md:w-1/4">
                        <span className="text-title text-xl">Seja bem-vindo.</span>
                        <span className="text-title text-xl font-bold">
                            O que deseja fazer?
                        </span>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-1/2">
                        <Link
                            to="/study"
                            className="flex-1 h-24 rounded-lg bg-primary hover:bg-primary/90 transition-colors flex items-center justify-center gap-4 group"
                        >
                            <BookOpen className="w-8 h-8 text-white" />
                            <span className="text-white text-xl font-bold">Estudar</span>
                        </Link>

                        <Link
                            to="/give-classes"
                            className="flex-1 h-24 rounded-lg bg-success hover:bg-success/90 transition-colors flex items-center justify-center gap-4 group"
                        >
                            <Monitor className="w-8 h-8 text-white" />
                            <span className="text-white text-xl font-bold">Dar aulas</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground text-sm md:w-1/4 justify-end sm:flex-col">
                        <span className='sm:text-center'>
                            {`Total de ${totalConnections} ${totalConnections === 1 ? `conexão` : `conexões`} `}  <br /> já realizadas
                        </span>
                        <Heart className="w-4 h-4 text-primary fill-primary" />
                    </div>
                </div>
            </div>
        </div >
    )
}
