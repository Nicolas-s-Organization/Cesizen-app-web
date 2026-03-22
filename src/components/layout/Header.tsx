import { useAuth } from '../../hooks/useAuth'
import { LogOut } from 'lucide-react'
import logo from '../../assets/Logo-cesizen.png'

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white border-b border-[var(--color-border)] px-6 py-3">
      <div className="flex items-center justify-between">

        {/* Logo + Titre */}
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <img src={logo} alt="CesiZen" className="w-12 h-12" />
          </div>

          <div className="w-px h-10 bg-[var(--color-border)]" />
          
          <div>
            <h1 className="text-[var(--color-primary-text)] font-bold text-lg leading-tight">
              Interface Administrateur
            </h1>
            <p className="text-[var(--color-text-muted)] text-sm">
              Gestion de la plateforme CESI Zen
            </p>
          </div>
        </div>

        {/* User + Logout */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-semibold text-[var(--color-text-primary)] text-sm">
              {user?.firstname || 'Admin CESI'}
            </p>
            <p className="text-[var(--color-text-muted)] text-xs">
              {user?.role || 'Administrateur'}
            </p>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 border border-[var(--color-border)] rounded-lg px-3 py-2 text-sm text-[var(--color-text-primary)] hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Déconnexion
          </button>
        </div>

      </div>
    </header>
  )
}

export default Header
