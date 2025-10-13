import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState<string>('Chargement...')
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3333'

  useEffect(() => {
    fetch(`${apiUrl}/`)
      .then((res) => res.json())
      .then((data) => {
        if (data.message) setMessage(data.message)
        else setMessage('Aucun message trouvé')
      })
      .catch(() => setMessage('Erreur : impossible de contacter le serveur'))
  }, [apiUrl])

  useEffect(() => {
    const token = localStorage.getItem('token')
    console.log('Token:', token) // Debug log
    if (!token) {
      setLoading(false)
      return
    }

    fetch('http://localhost:3333/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Unauthorized')
        return res.json()
      })
      .then((data) => setUser(data.user))
      .catch(() => setUser(null))
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const handleLogout = async () => {
    try {
      await fetch(`${apiUrl}/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      localStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      console.error('Erreur lors de la déconnexion', error)
    }
  }

  if (loading) return <p className="p-4">Chargement...</p>

  return (
    <div className="p-4">
      <p className="mt-2 text-gray-700">{message}</p>

      {user ? (
        <div className="mt-4">
          <span>{user.email}</span>
          <button
            onClick={handleLogout}
            className="ml-4 text-blue-500 hover:underline"
          >
            Se déconnecter
          </button>

          <Link to="/dashboard" className="ml-4 text-blue-500 hover:underline">
            Aller au tableau de bord
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          <Link to="/auth/register" className="text-blue-500 hover:underline">
            S'inscrire
          </Link>
          <span className="mx-2">|</span>
          <Link to="/auth/login" className="text-blue-500 hover:underline">
            Se connecter
          </Link>
        </div>
      )}
    </div>
  )
}
