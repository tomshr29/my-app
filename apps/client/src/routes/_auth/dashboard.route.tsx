import { useAuth } from '@/auth'
import {
  Link,
  Outlet,
  createFileRoute,
  linkOptions,
} from '@tanstack/react-router'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { DynamicIcon } from 'lucide-react/dynamic'

export const Route = createFileRoute('/_auth/dashboard')({
  component: DashboardComponent,
})

const options = [
  linkOptions({
    to: '/dashboard',
    label: 'Home',
    activeOptions: { exact: true },
    icon: 'home',
  }),
  linkOptions({
    to: '/dashboard/invoices',
    label: 'Invoices',
    icon: 'file-text',
  }),
  linkOptions({
    to: '/dashboard/expensive',
    label: 'Expensive',
    icon: 'dollar-sign',
  }),
  linkOptions({
    to: '/dashboard/settings',
    label: 'Settings',
    icon: 'user',
  }),
]

function DashboardComponent() {
  return (
    <div className="relative isolate flex min-h-svh w-full bg-white max-lg:flex-col lg:bg-zinc-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
        <div className="flex h-full min-h-0 flex-col">
          <AccountToggle />
          <div className="flex flex-1 flex-col overflow-y-auto p-4">
            <RouteSelect />
          </div>
        </div>
      </div>

      {/* Dashboard */}
      <div className="flex flex-1 flex-col pb-2 lg:min-w-0 lg:pt-2 lg:pr-2 lg:pl-64">
        <div className="grow p-6 lg:rounded-lg lg:bg-white lg:p-10 lg:shadow-xs lg:ring-1 lg:ring-zinc-950/5">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AccountToggle = () => {
  const { user } = useAuth()
  return (
    <div className="flex flex-col border-b border-zinc-950/5 p-4">
      <button className="flex p-0.5 hover:bg-stone-200 rounded transition-colors relative gap-2 w-full items-center">
        <img
          src="https://api.dicebear.com/9.x/notionists/svg"
          alt="avatar"
          className="size-8 rounded shrink-0 bg-blue-500 shadow"
        />
        <div className="text-start">
          <span className="text-sm font-semibold block">
            {user?.profile?.fullName}
          </span>
          <span className="text-xs block text-stone-500">{user?.email}</span>
        </div>

        <ChevronDown
          size={12}
          className="absolute right-2 top-1/2 translate-y-[calc(-50%+4px)]"
        />
        <ChevronUp
          size={12}
          className="absolute right-2 top-1/2 translate-y-[calc(-50%-4px)]"
        />
      </button>
    </div>
  )
}

const RouteSelect = () => {
  return (
    <div className="flex flex-col gap-0.5">
      {options.map((option) => {
        return (
          <Link
            {...option}
            key={option.to}
            activeProps={() => ({
              className: 'bg-white text-stone-950 shadow',
            })}
            inactiveProps={() => ({
              className:
                'hover:bg-stone-200 bg-transparent text-stone-500 shadow-none',
            })}
            className="group flex items-center justify-start gap-2 w-full rounded px-2 py-1.5 text-sm transition-[box-shadow_background-color_color]"
          >
            {({ isActive }) => {
              return (
                <>
                  <DynamicIcon
                    size={12}
                    name={option.icon}
                    className={isActive ? 'text-blue-500' : 'text-stone-500'}
                  />
                  <span>{option.label}</span>
                </>
              )
            }}
          </Link>
        )
      })}
    </div>
  )
}
