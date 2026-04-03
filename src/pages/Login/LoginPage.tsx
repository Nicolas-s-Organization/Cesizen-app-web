import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, LogIn, Info } from 'lucide-react'
import logo from '../../assets/Logo-cesizen.png'
import { useLogin } from '../../hooks/useLogin'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)

  const { email, setEmail, password, setPassword, errors, globalError, isLoading, handleLogin } = useLogin()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-bg-page">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <img src={logo} alt="CesiZen" className="w-18 h-18" />
        </div>

        {/* Title */}
        <div className="text-center mb-6">
          <h1 className="text-2xl mb-2 font-bold text-text-primary">Interface Administrateur</h1>
          <p className="text-sm mt-1 mb-8 text-text-muted">Connectez-vous pour gérer la plateforme CESI Zen</p>
        </div>

        {/* Global Error */}
        {globalError && (
          <div className="mb-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600">
            {globalError}
          </div>
        )}

        {/* Form */}
        <form className="space-y-4" onSubmit={handleLogin}>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1 text-text-primary">
              Adresse email
            </label>
            <div className={`flex items-center border rounded-lg px-3 py-2 gap-2 bg-gray-50 ${errors.email ? 'border-red-400' : 'border-border'}`}>
              <Mail size={16} className="text-text-muted" />
              <input
                type="email"
                placeholder="admin@cesi-zen.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-text-primary"
              />
            </div>
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-sm font-medium text-text-primary">Mot de passe</label>
              {/* <a href="#" className="text-sm font-medium text-primary">Mot de passe oublié ?</a> */}
            </div>
            <div className={`flex items-center border rounded-lg px-3 py-2 gap-2 bg-gray-50 ${errors.password ? 'border-red-400' : 'border-border'}`}>
              <Lock size={16} className="text-text-muted" />
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none text-text-primary"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword
                  ? <EyeOff size={16} className="text-text-muted" />
                  : <Eye size={16} className="text-text-muted" />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-8 flex items-center justify-center gap-2 py-3 rounded-lg text-white font-semibold text-sm bg-primary hover:bg-primary-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <LogIn size={16} />
            {isLoading ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {/* Info box */}
        <div className="mt-8 flex gap-3 rounded-lg p-4 bg-blue-50 border border-blue-200">
          <Info size={18} className="text-blue-500 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-blue-700">Accès réservé aux administrateurs</p>
            <p className="text-xs mt-0.5 text-blue-500">
              Cette interface est réservée aux administrateurs de la plateforme CESI Zen. Si vous êtes un utilisateur, veuillez utiliser l'application mobile.
            </p>
          </div>
        </div>

      </div>

      <p className="mt-6 text-xs text-text-muted">© 2025 CESI Zen - Tous droits réservés</p>

    </div>
  )
}
