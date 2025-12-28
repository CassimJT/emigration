
import { Outlet } from 'react-router-dom'
import Navbar from '@/components/Navbar.jsx'
import Footer from '@/components/footer'

export default function AppLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}
