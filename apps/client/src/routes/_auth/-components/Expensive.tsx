import * as React from 'react'
import { useAuth } from '@/auth'
import { tuyau } from '@/tuyau'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'

interface Property {
  id: number
  title: string
  description?: string
  price: number
  surface: number
  city: string
  available: boolean
  createdAt: string
}

export default function Expensive() {
  const router = useRouter()
  const navigate = useNavigate()
  const auth = useAuth()
  const [animals, setAnimals] = React.useState<Property[]>([])
  const [isLoading, setIsLoading] = React.useState(true)

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      auth.logout().then(() => {
        router.invalidate().finally(() => {
          navigate({ to: '/' })
        })
      })
    }
  }

  React.useEffect(() => {
    const fetchAnimals = async () => {
      if (!auth.isAuthenticated) return setIsLoading(false)

      try {
        const token = localStorage.getItem('auth-token')
        const data = await tuyau.properties.mine
          .$get({
            headers: { Authorization: `Bearer ${token}` },
          })
          .unwrap()
        console.log(data)
        setAnimals(data)
      } catch (err) {
        console.error('Failed to fetch animals', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAnimals()
  }, [auth.isAuthenticated])

  return (
    <div className="p-2 h-full">
      <section className="p-2">
        <h2 className="text-stone-300 text-lg font-semibold mb-4">
          Your Properties
        </h2>

        {isLoading ? (
          <p>Not profdez...</p>
        ) : animals.length === 0 ? (
          <p>You haven’t posted any preof yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-stone-700 text-sm text-stone-300">
              <thead className="bg-stone-800">
                <tr>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Title
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Description
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Price
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Surface
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    City
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Available
                  </th>
                  <th className="px-3 py-2 border border-stone-700 text-left">
                    Created At
                  </th>
                </tr>
              </thead>

              <tbody>
                {animals.map((animal) => (
                  <tr
                    key={animal.id}
                    className="odd:bg-stone-900 even:bg-stone-800 hover:bg-stone-700"
                  >
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.title}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.description}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.price}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.surface}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.city}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {animal.available ? 'Yes' : 'No'}
                    </td>
                    <td className="px-3 py-2 border border-stone-700">
                      {new Date(animal.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  )
}
