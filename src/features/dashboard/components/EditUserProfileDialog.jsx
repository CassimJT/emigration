// components/admin/EditUserProfileDialog.jsx
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Edit } from "lucide-react"
import { cn } from "@/lib/utils"

export function EditUserProfileDialog({ user, trigger, onSave }) {
  const [open, setOpen] = useState(false)
  
  const [formData, setFormData] = useState({
    emailAddress: user.emailAddress || "",
    residentialAddress: user.residentialAddress || "",
    role: user.role || "user",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRoleToggle = (checked) => {
    setFormData((prev) => ({
      ...prev,
      role: checked ? "admin" : "user",
    }))
  }

  const handleSubmit = () => {
    const updates = {
      emailAddress: formData.emailAddress.trim(),
      residentialAddress: formData.residentialAddress.trim(),
      role: formData.role,
    }

    // Remove empty fields if you don't want to send them
    if (!updates.emailAddress) delete updates.emailAddress
    if (!updates.residentialAddress) delete updates.residentialAddress

    console.log("Saving updates:", updates) // ← replace with real API call later

    onSave?.(updates)

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm" className="gap-2">
            <Edit className="h-4 w-4" />
            Edit
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Edit User Profile</DialogTitle>
          <DialogDescription>
            Make changes to user{" "}
            <span className="font-medium">
              {user.fullName || user.emailAddress}
            </span>
            . Click save when you're done.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Email */}
          <div className="grid gap-2">
            <Label htmlFor="email">Email address</Label>
            <Input
              id="email"
              name="emailAddress"
              type="email"
              value={formData.emailAddress}
              onChange={handleInputChange}
              placeholder="user@example.com"
            />
          </div>

          {/* Residential Address */}
          <div className="grid gap-2">
            <Label htmlFor="address">Residential Address</Label>
            <Textarea
              id="address"
              name="residentialAddress"
              value={formData.residentialAddress}
              onChange={handleInputChange}
              placeholder="Area 47, Lilongwe, Malawi"
              className="min-h-[80px]"
            />
          </div>

          {/* Role toggle */}
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="role">Administrator privileges</Label>
              <p className="text-sm text-muted-foreground">
                Granting admin role gives full dashboard access
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge
                variant={formData.role === "admin" ? "default" : "secondary"}
                className={cn(
                  "transition-colors",
                  formData.role === "admin" && "bg-primary text-primary-foreground"
                )}
              >
                {formData.role === "admin" ? "Admin" : "Regular User"}
              </Badge>

              <Switch
                id="role"
                checked={formData.role === "admin"}
                onCheckedChange={handleRoleToggle}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}