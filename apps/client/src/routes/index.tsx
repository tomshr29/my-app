import { Link, createFileRoute } from '@tanstack/react-router'
import Header from '@/components/Header'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <main>
      <Header />
      <div className="relative overflow-hidden px-4">
        <div className="max-w-6xl mx-auto relative py-20">
          <div className="flex flex-col gap-5">
            <h1 className="text-4xl sm:text-6xl">
              Musical widget for streamers!
            </h1>
            <p className="text-xl font-thin text-stone-400">
              Compatible with{''}{' '}
              <span className="font-normal">AppleMusic</span>,
              <span className="font-normal">Spotify</span>
              {''} on Windows and MacOS.
            </p>
            <div className="flex gap-5 py-20">
              <Link
                to="/properties"
                className="flex items-center gap-2 justify-center bg-stone-200 transition-colors duration-400 ease-in-out text-stone-950 rounded py-3 px-2 text-center text-sm"
              >
                Get started
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
