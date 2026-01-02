import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/give-classes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/give-classes/"!</div>
}
