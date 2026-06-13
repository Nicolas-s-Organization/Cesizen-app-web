import { Outlet } from "react-router"
import Header from "./Header"
import Navbar from "./Navbar"
import Footer from "../common/Footer"

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--color-bg-page)]">
      <Header />
      <Navbar />
      <main className="p-6">
        <Outlet />
      </main>
        <Footer />
    </div>
  )
}

export default Layout
