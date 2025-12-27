import { Outlet } from 'react-router-dom'

function DashboardPage() {
  return (
    <div>
      <h1>Dashboard</h1>

      {/* Nested routes render here */}
      <Outlet />
    </div>
  )
}

export default DashboardPage
