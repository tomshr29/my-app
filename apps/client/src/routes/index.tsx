import Header from '@/components/Header'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomeComponent,
})

function HomeComponent() {
  const { auth } = Route.useRouteContext()

  return (
    <div>
      <Header />
      <div className="flex items-start px-10 pt-24">
        <div className="max-w-5xl">
          <h1 className="text-8xl font-bold mb-6">
            Bienvenue sur notre plateforme immobilière &
          </h1>
          <p className="text-lg leading-relaxed text-gray-700">
            Trouvez la maison ou l'appartement de vos rêves grâce à notre
            sélection exclusive de biens immobiliers. Que vous cherchiez à
            acheter, louer ou investir, nous vous accompagnons à chaque étape
            pour réaliser votre projet.
          </p>
          <Link
            to="/properties"
            className="inline-block mt-6 px-8 py-4 text-lg bg-black text-white rounded-2xl font-semibold hover:bg-gray-800 transition shadow-lg"
          >
            Get Started
          </Link>
          <p className="mt-4 text-sm text-gray-500">
            Explorez nos offres et commencez votre nouvelle aventure immobilière
            dès aujourd'hui.
          </p>
        </div>
      </div>
    </div>
  )
}
