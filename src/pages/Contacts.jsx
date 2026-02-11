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
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-2xl font-bold mb-4">Contact Super Admin</h1>
       Contact super admin coming soon...
    </div>
  )
}
