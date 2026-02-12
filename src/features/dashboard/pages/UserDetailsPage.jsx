import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import {
    User,
    ShieldCheck,
    Mail,
    Calendar,
    ArrowLeft,
    AlertCircle,
} from 'lucide-react'
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDashboard } from '../hooks/useDashboard'

export default function UserDetailPage() {
    const { id } = useParams() 
    const navigate = useNavigate()
    const { userToView:user, loadingUserDetails, userError, getUserDetails } = useDashboard()


    React.useEffect(() => {
        getUserDetails(id)
    }, [id, getUserDetails]);

    // Derive display name / initials
    const displayName = React.useMemo(() => {
        if (!user) return 'Unknown User'
        if (user.emailAddress) {
        const beforeAt = user.emailAddress.split('@')[0]
        return beforeAt.charAt(0).toUpperCase() + beforeAt.slice(1)
        }
        return 'User'
    }, [user])

    const initials = React.useMemo(() => {
        if (!displayName || displayName === 'Unknown User') return 'U'
        return displayName
        .split(/\s+/)
        .map((word) => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }, [displayName])

    if (loadingUserDetails) {
        return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
            <div className="mb-6">
            <Skeleton className="h-10 w-32" />
            </div>
            <Card>
            <CardHeader className="flex flex-col items-center space-y-4">
                <Skeleton className="h-32 w-32 rounded-full" />
                <div className="space-y-2 text-center">
                <Skeleton className="h-8 w-64" />
                <Skeleton className="h-4 w-80" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Skeleton className="h-24" />
                <Skeleton className="h-24" />
                </div>
            </CardContent>
            </Card>
        </div>
        )
    }

    if (userError || !user) {
        return (
        <div className="container mx-auto max-w-md px-4 py-16 text-center">
            <AlertCircle className="mx-auto h-16 w-16 text-destructive" />
            <h2 className="mt-6 text-2xl font-semibold">User not found</h2>
            <p className="mt-3 text-muted-foreground">
                {userError || "We couldn't load this user's details."}
            </p>
            <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
                Go Back
            </Button>
            <Button onClick={() => window.location.reload()}>
                Retry
            </Button>
            </div>
        </div>
        )
    }

    return (
        <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Back button */}
        <Button
            variant="ghost"
            className="mb-6 pl-0 text-muted-foreground hover:text-foreground"
            onClick={() => navigate(-1)}
        >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to list
        </Button>

        <Card className="shadow-sm">
            <CardHeader className="text-center pb-2">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-center sm:gap-8">
                <Avatar className="h-28 w-28 border-2 border-primary/20">
                <AvatarImage
                    src="https://via.placeholder.com/150"
                    alt={`${displayName}'s avatar`}
                />
                <AvatarFallback className="bg-primary/10 text-primary text-3xl font-medium">
                    {initials}
                </AvatarFallback>
                </Avatar>

                <div className="space-y-2 text-center sm:text-left">
                <CardTitle className="text-3xl">{displayName}</CardTitle>
                <CardDescription className="text-lg">
                    {user.emailAddress}
                </CardDescription>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-3">
                    <Badge variant="outline" className="text-sm">
                    Role: {user.role || 'User'}
                    </Badge>
                    {user.role === 'superadmin' && (
                    <Badge variant="default" className="bg-red-600/10 text-red-700">
                        Super Admin
                    </Badge>
                    )}
                </div>
                </div>
            </div>
            </CardHeader>

            <CardContent className="pt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Personal Info */}
                <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Account Information</h3>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium">Email Address</p>
                        <p className="text-muted-foreground">{user.emailAddress}</p>
                    </div>
                    </div>

                    <div className="flex items-start gap-4">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium">National ID</p>
                        <p className="text-muted-foreground font-mono">
                        {user.nationalId || 'Not available'}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-start gap-4">
                    <ShieldCheck className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium">Role</p>
                        <p className="text-muted-foreground capitalize">
                        {user.role || 'User'}
                        </p>
                    </div>
                    </div>
                </div>
                </div>

                {/* Metadata */}
                <div className="space-y-6">
                <h3 className="text-lg font-medium border-b pb-2">Metadata</h3>
                
                <div className="space-y-4">
                    <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium">Created At</p>
                        <p className="text-muted-foreground">
                        {user.createdAt
                            ? new Date(user.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })
                            : 'Unknown'}
                        </p>
                    </div>
                    </div>

                    <div className="flex items-start gap-4">
                    <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                        <p className="text-sm font-medium">User ID</p>
                        <p className="text-muted-foreground font-mono text-sm break-all">
                        {user._id}
                        </p>
                    </div>
                    </div>
                </div>
                </div>
            </div>

            {/* Actions */}
            <div className="mt-10 flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline">Edit User</Button>
                <Button variant="destructive">Deactivate Account</Button>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}