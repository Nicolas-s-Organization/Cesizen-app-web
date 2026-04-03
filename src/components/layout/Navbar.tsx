import { NavLink } from 'react-router'
import { Users, FileText, Heart } from 'lucide-react'

const navItems = [
  // { to: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { to: '/users', label: 'Utilisateurs', icon: Users },
  { to: '/articles', label: 'Articles', icon: FileText },
  { to: '/emotions', label: 'Émotions', icon: Heart },
]

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-[var(--color-border)] px-6">
      <div className="flex items-center gap-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${isActive
                ? 'border-[var(--color-primary)] text-[var(--color-primary-text)]'
                : 'border-transparent text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]'
              }`
            }
          >
            <Icon size={16} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
