import { useAuth } from '@/auth'
import { Link } from '@tanstack/react-router'

export default function Header() {
  const { user } = useAuth()

  return (
    <div className="fixed inset-x-0 top-0 z-10 border-b border-black/5">
      <div className="flex h-14 items-center justify-between gap-8 px-10 bg-white">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold text-black hover:underline">
          ImmoSite
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/properties" className="hover:text-black transition">
            Propriétés
          </Link>
          <Link to="/" className="hover:text-black transition">
            Agents
          </Link>
          <Link to="/" className="hover:text-black transition">
            Contact
          </Link>
        </nav>

        {/* User actions */}
        <div>
          {user ? (
            <div className="flex items-center space-x-4">
              <Link to="/dashboard" className="underline">
                My Account Dashboard
              </Link>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm bg-black text-white rounded-md hover:bg-gray-800 transition"
            >
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
