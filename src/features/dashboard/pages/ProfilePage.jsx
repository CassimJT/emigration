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
    import { Frown } from 'lucide-react'
    import React from 'react'
    import { useUserProfile } from '../hooks/useUserProfile'

    export default function ProfilePage() {
    const { profile, profileLoading, profileError, fetchProfile } = useUserProfile()

    React.useEffect(() => {
        if (!profile && !profileLoading && !profileError) {
        fetchProfile()
        }
    }, [profile, profileLoading, profileError, fetchProfile])

    const displayName = React.useMemo(() => {
        if (!profile?.emailAddress) return 'User'
        const beforeAt = profile.emailAddress.split('@')[0]
        return profile.firstName || beforeAt.charAt(0).toUpperCase() + beforeAt.slice(1)
    }, [profile])

    const initials = React.useMemo(() => {
        if (!displayName || displayName === 'User') return 'U'
        return displayName
        .split(/\s+/)
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    }, [displayName])

    if (profileLoading) {
        return (
        <div className="container mx-auto max-w-3xl px-4 py-10">
            <Card className="min-h-[60vh]">
            <CardHeader className="flex flex-col items-center space-y-4">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="space-y-2 text-center">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
                <Skeleton className="h-8 w-3/4 mx-auto" />
                <div className="flex justify-center gap-4">
                <Skeleton className="h-10 w-32" />
                <Skeleton className="h-10 w-32" />
                </div>
            </CardContent>
            </Card>
        </div>
        )
    }

    if (profileError || !profile) {
        return (
        <div className="container mx-auto max-w-md px-4 py-16 text-center">
            <Frown className="mx-auto h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Profile not found</h2>
            <p className="mt-3 text-muted-foreground">
            {profileError?.message || "We couldn't load your profile. Please try again."}
            </p>
            <Button variant="outline" className="mt-6" onClick={() => fetchProfile()}>
            Retry
            </Button>
        </div>
        )
    }

    return (
        <div className="container mx-auto max-w-3/4 px-4 py-10">
        <Card className="min-h-[50vh] shadow-sm">
            <CardHeader className="text-center">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
                <Avatar className="h-20 w-20 border-2 border-orange-500 sm:h-28 sm:w-28">
                <AvatarImage
                    src={profile?.avatarUrl || "https://via.placeholder.com/150"}
                    alt={`${displayName}'s profile picture`}
                />
                <AvatarFallback className="bg-orange-100 text-orange-800 text-xl font-medium">
                    {initials}
                </AvatarFallback>
                </Avatar>

                <div className="space-y-1 text-center sm:text-left">
                <CardTitle className="text-2xl">{displayName}</CardTitle>
                <CardDescription className="text-base">{profile?.emailAddress || "No email address available"}</CardDescription>
                </div>
            </div>
            </CardHeader>

            <CardContent className="space-y-8 pt-8">
            <div className="text-center sm:text-left">
                <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200">
                Welcome back, {displayName}!
                </h3>
                <p className="mt-2 text-muted-foreground">
                Here you can manage your account settings, view your activity history,
                update preferences, and more.
                </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 sm:justify-start">
                <Button variant="default" className="rounded">Edit Profile</Button>
                <Button variant="outline" className="rounded">Account Settings</Button>
            </div>
            </CardContent>
        </Card>
        </div>
    )
}