export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 text-white py-12 px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Logo / Nom */}
        <div className="text-2xl font-extrabold tracking-wide">ImmoSite</div>

        {/* Navigation liens */}
        <nav className="flex flex-wrap gap-8 text-lg font-semibold">
          <a
            href="/properties"
            className="hover:underline hover:text-gray-300 transition"
          >
            Propriétés
          </a>
          <a
            href="/agents"
            className="hover:underline hover:text-gray-300 transition"
          >
            Agents
          </a>
          <a
            href="/contact"
            className="hover:underline hover:text-gray-300 transition"
          >
            Contact
          </a>
          <a
            href="/about"
            className="hover:underline hover:text-gray-300 transition"
          >
            À propos
          </a>
          <a
            href="/privacy"
            className="hover:underline hover:text-gray-300 transition"
          >
            Politique de confidentialité
          </a>
        </nav>

        {/* Mentions légales */}
        <div className="text-sm text-gray-200">
          &copy; {new Date().getFullYear()} ImmoSite. Tous droits réservés.
        </div>
      </div>
    </footer>
  )
}
