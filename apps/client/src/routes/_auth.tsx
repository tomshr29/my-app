import { createFileRoute, Link, Outlet, redirect } from '@tanstack/react-router'
import { House, Menu, UserRoundCog, X } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_auth')({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
      })
    }
  },
  component: AuthLayout,
})

function AuthLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative isolate flex min-h-screen w-full max-lg:flex-col bg-zinc-900 lg:bg-zinc-950">
      <div className="fixed inset-y-0 left-0 w-64 max-lg:hidden">
        <div className="p-4 flex justify-between items-center gap-x-2">
          <Link
            className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white "
            to="/properties"
            aria-label="Brand"
          >
            Brand
          </Link>
        </div>
        <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
          <div className=" pb-0 px-2  w-full flex flex-col flex-wrap">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/my-account"
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-zinc-800 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  activeProps={{
                    className:
                      'bg-indigo-600 text-white font-semibold dark:bg-indigo-600 dark:text-white',
                  }}
                >
                  <House />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/saved"
                  className="w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm rounded-lg text-zinc-800 hover:bg-gray-100 dark:text-zinc-200 dark:hover:bg-zinc-700"
                  activeProps={{
                    className:
                      'bg-indigo-600 text-white font-semibold dark:bg-indigo-600 dark:text-white',
                  }}
                >
                  <UserRoundCog />
                  Profile
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <header className="flex items-center px-4 lg:hidden">
        <div className="py-2.5">
          <button onClick={() => setOpen(true)} className="py-2.5">
            <Menu color="grey" />
          </button>
        </div>
      </header>

      {open && (
        <div className="lg:hidden">
          <div
            className="fixed inset-0 bg-black/30 transition z-40"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-full max-w-80 p-2 transition duration-300 ease-in-out z-50">
            <div className="flex h-full flex-col rounded-lg bg-white shadow-xs ring-1 ring-zinc-950/5 dark:bg-zinc-900 dark:ring-white/10 relative p-4">
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="absolute top-4 right-4 p-2"
              >
                <X />
              </button>

              <nav className="mt-12 flex flex-col gap-4">
                <Link
                  to="/saved"
                  className="text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md px-3 py-2"
                  onClick={() => setOpen(false)} // ferme menu au clic
                >
                  Profile
                </Link>
                {/* Autres liens si besoin */}
              </nav>
            </div>
          </div>
        </div>
      )}

      <main className="flex flex-1 flex-col lg:py-2 lg:pr-2 lg:pl-64">
        <div className="grow p-6 lg:rounded-lg lg:p-10 lg:shadow-xs lg:ring-1 lg:bg-zinc-900 lg:ring-white/10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
