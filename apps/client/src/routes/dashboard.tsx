import { useAuth } from '@/auth'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard')({
  component: RouteComponent,
})

function RouteComponent() {
  const { user } = useAuth()

  return (
    <section className="grid gap-2 p-2">
      <p>Hi {user?.email}!</p>
      <p>You are currently on the dashboard route.</p>
    </section>
  )
}
