import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/not-found')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="flex flex-col items-center justify-center h-svh">
    <h1 className="text-4xl font-bold text-[#6842C2]">404</h1>
    <p className="text-lg text-muted-foreground">Página não encontrada</p>
  </div>
}
