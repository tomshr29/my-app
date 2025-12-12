import * as React from 'react'

export default function Expensive() {
  return (
    <div className={`p-2`}>
      I am an "expensive" component... which really just means that I was
      code-split 😉
    </div>
  )
}
{
  /* import { createFileRoute } from '@tanstack/react-router'
  import { Link, Outlet, linkOptions } from '@tanstack/react-router'
  
  export const Route = createFileRoute('/_auth/dashboard')({
    component: DashboardComponent,
  })
  
  const options = [
    linkOptions({
      to: '/dashboard',
      label: 'Home',
      activeOptions: { exact: true },
    }),
    linkOptions({
      to: '/dashboard/invoices',
      label: 'Invoices',
    }),
    linkOptions({
      to: '/dashboard/expensive',
      label: 'Expensive',
    }),
    linkOptions({
      to: '/dashboard/settings',
      label: 'Settings',
    }),
  ]
  
  function DashboardComponent() {
    return (
      <div className="flex h-screen">
        <aside className="w-56 border-r flex flex-col bg-white">
          <Link to="/properties">
            <h2 className="text-xl p-4 border-b">Dashboard</h2>
          </Link>
  
          <nav className="flex flex-col divide-y">
            {options.map((option) => (
              <Link
                key={option.to}
                {...option}
                activeProps={{ className: 'font-bold bg-gray-100' }}
                className="p-3 hover:bg-gray-50 transition"
              >
                {option.label}
              </Link>
            ))}
          </nav>
        </aside>
  
        <main className="flex-1 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    )
  }*/
}
