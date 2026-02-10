import Contact from '@/components/contact'
import { useAuth } from '@/hooks/useAuth';

export default function Contacts() {
    const {role} = useAuth();

  if (role === "client" && role !== "officer" && role !== "admin" && role !== "superadmin"){
  return (
    <div className="w-full min-h-screen bg-background">
        <Contact />
    </div>
  )}
 return (
    <div className="w-full min-h-screen bg-background">
        Contact super admin coming soon...
    </div>
  )
}
