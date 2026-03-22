import { Outlet } from "react-router"
import Header from "./Header"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg-page)]">
      <Header />
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
