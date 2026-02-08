import React, { useState } from "react";
import { useDashboard } from "../hooks/useDashboard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, MoreHorizontal, Trash2, TriangleAlert, UsersRound } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Navigate, useOutletContext } from "react-router-dom";

const userRoles = ["client", "officer", "admin"];

export default function ManageUsersPage() {
  const { users,deleteUser } = useDashboard();
  const { user } = useAuth();

  const { currentRole } = useOutletContext();
  const role = (currentRole || user?.role || 'officer').toLowerCase();

  // Track displayed role for each user (controlled value)
  const [displayedRoles, setDisplayedRoles] = useState(
    ! users ? {} : users.reduce((acc, user) => {
      acc[user.id] = user.role;
      return acc;
    }, {})
  );

  // Role change confirmation state
  const [selectedUser, setSelectedUser] = useState(null);
  const [pendingRole, setPendingRole] = useState("");
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false);

  const handleRoleSelect = (userId, selectedRole) => {
    const currentRole = displayedRoles[userId];

    if (selectedRole === currentRole) return;

    const user = users.find((u) => u.id === userId);
    if (!user) return;

    setSelectedUser(user);
    setPendingRole(selectedRole);
    setIsRoleDialogOpen(true);
  };

  const confirmRoleChange = () => {
    if (!selectedUser || !pendingRole) return;

    console.log(
      `Confirmed: Changed role of ${selectedUser.name} (ID ${selectedUser.id}) to ${pendingRole}`
    );

    // Only now update the visible role
    setDisplayedRoles((prev) => ({
      ...prev,
      [selectedUser.id]: pendingRole,
    }));

    //  updateUserRole(selectedUser.id, pendingRole)

    // Clean up
    setIsRoleDialogOpen(false);
    setSelectedUser(null);
    setPendingRole("");
  };

  const cancelRoleChange = () => {
    setIsRoleDialogOpen(false);
    setSelectedUser(null);
    setPendingRole("");
  };

  const handleViewProfile = (user) => console.log("View profile:", user.emailAddress);

  const handleDeleteUser = (id) => {
    try {
      deleteUser(id);
      console.log(`Deleted user ID: ${id}`);
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };

  if (role !== 'admin' && role !== 'superadmin') {
    return (
      <Navigate to="*" replace />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 py-10 px-4 md:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Card className="border border-gray-300 shadow-2xl shadow-black/5 backdrop-blur-sm bg-card/95 overflow-hidden rounded-2xl">
          <CardHeader className="px-6 py-8 border-b bg-gradient-to-r from-muted/30 to-transparent">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-3 shadow-sm">
                  <UsersRound className="h-7 w-7 text-primary" strokeWidth={2.2} />
                </div>
                <div>
                  <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                    User Management
                  </CardTitle>
                  <CardDescription className="mt-1.5 text-base font-medium">
                    {users.length} registered users
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b bg-muted/40 hover:bg-muted/40">
                    <TableHead className="h-14 pl-8 text-muted-foreground font-medium w-[38%]">
                      USER
                    </TableHead>
                    <TableHead className="h-14 text-muted-foreground font-medium w-[22%]">
                      ROLE
                    </TableHead>
                    <TableHead className="h-14 text-right pr-8 text-muted-foreground font-medium w-[18%]">
                      ACTIONS
                    </TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  { !users || users === "null" ? (
                    <TableRow>
                      <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                        No users available
                      </TableCell>
                    </TableRow>
                  ) : users.map((user) => (
                    <TableRow
                      key={user.id}
                      className="group border-b last:border-none hover:bg-accent/60 transition-all duration-200"
                    >
                      <TableCell className="pl-8 py-5">
                        <div className="flex items-center gap-4">
                          <Avatar className="h-12 w-12 ring-1 ring-border/40 group-hover:ring-primary/30 transition-all duration-300 shadow-sm">
                            <AvatarImage src="/" alt={user.emailAddress} />
                            <AvatarFallback className="bg-gradient-to-br from-primary/5 via-primary/10 to-transparent text-primary font-semibold text-lg">
                              {user.emailAddress.split("@")[0].slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5 min-w-0">
                            <p className="text-sm text-muted-foreground truncate">
                              {user.emailAddress}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Select
                          value={displayedRoles[user.id] || user.role}
                          onValueChange={(newRole) => handleRoleSelect(user.id, newRole)}
                        >
                          <SelectTrigger className="w-40 bg-background/60 focus:ring-primary/40 h-9 text-sm shadow-sm">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent className="bg-white">
                            {userRoles.map((role) => (
                              <SelectItem key={role} value={role} className="text-sm">
                                {role}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>

                      <TableCell className="text-right pr-8">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-9 w-9 rounded-full opacity-60 group-hover:opacity-100 group-hover:bg-accent transition-all duration-200"
                            >
                              <MoreHorizontal className="h-4.5 w-4.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="w-56 rounded-xl mt-1 bg-white"
                          >
                            <DropdownMenuLabel className="text-xs text-muted-foreground font-normal py-1.5">
                              Actions
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-border/40 my-1" />
                            <DropdownMenuItem className="gap-2.5 py-2.5 text-sm cursor-pointer">
                              <Eye className="h-4 w-4 opacity-80" />
                              View Profile
                            </DropdownMenuItem>

                            <Dialog>
                              <DialogTrigger asChild>
                                <DropdownMenuItem
                                  className="gap-2.5 py-2.5 text-destructive hover:text-destructive focus:text-destructive text-sm cursor-pointer"
                                  onSelect={(e) => e.preventDefault()}
                                >
                                  <Trash2 className="h-4 w-4 opacity-80" />
                                  Delete User
                                </DropdownMenuItem>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-md rounded-2xl border-4 border-slate-400 bg-white">
                                <DialogHeader className="pb-4">
                                  <DialogTitle className="text-xl">Delete User?</DialogTitle>
                                  <DialogDescription className="pt-2 text-base leading-relaxed">
                                    <TriangleAlert className="h-5 w-5 inline mr-2 text-yellow-500" />
                                    <span className="text-red-600 font-medium">
                                      This will permanently remove
                                    </span>{" "}
                                    <span className="font-medium text-foreground">{user.emailAddress}</span> 
                                  </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="gap-3 sm:gap-0">
                                  <Button variant="outline" className="sm:w-auto w-full rounded bg-green-700 hover:bg-green-800 text-white">
                                    Cancel
                                  </Button>
                                  <Button
                                    variant="destructive"
                                    className="sm:w-auto w-full rounded bg-red-700 hover:bg-red-800 text-white"
                                    onClick={() => handleDeleteUser(user.id)}
                                  >
                                    Delete
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="py-6 px-8 text-center text-sm text-muted-foreground/80 border-t bg-muted/20">
              Displaying all {users.length} users • Updated moments ago
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Role Change Confirmation Dialog */}
      <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
        <DialogContent className="sm:max-w-md rounded-xl border-4 border-slate-500 bg-white ">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-xl">Confirm Role Change</DialogTitle>
            <DialogDescription className="pt-3 text-base leading-relaxed">
              <TriangleAlert className="h-5 w-5 inline mr-2 text-yellow-500" />
              <span className="font-semibold">{selectedUser?.emailAddress}</span> role will be changed to{" "}
              <span className="font-semibold text-primary text-blue-700">{pendingRole}</span>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-3 sm:gap-0 pt-2">
            <Button variant="outline" onClick={cancelRoleChange} className="sm:w-auto rounded bg-green-700 hover:bg-green-800  w-full">
              Cancel
            </Button>
            <Button variant="default" onClick={confirmRoleChange} className="sm:w-auto rounded bg-red-700 hover:bg-red-800 w-full">
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}