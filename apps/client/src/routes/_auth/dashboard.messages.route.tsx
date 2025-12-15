import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/dashboard/messages')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="h-full border-r border-stone-800 min-w-64 p-4">
        <h2 className="text-lg">Messages</h2>
      </div>

      {/* Content */}
      <main className="flex-1 p-4 overflow-auto">
        <Outlet />
      </main>
    </div>
  )
}
