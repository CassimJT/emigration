import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar } from '@radix-ui/react-avatar'
import React from 'react'
import { useUserProfile } from '../hooks/useUserProfile'
import { Frown } from 'lucide-react'

export default function ProfilePage() {
        const { profile, profileLoading, fetchProfile } = useUserProfile()

        React.useEffect(() => {
            if (!profile) {
                fetchProfile()
            }
        }, [fetchProfile, profile])

    if (profileLoading) {
        return <div className="flex justify-center items-center h-64">Loading profile...</div>
    }

    if (!profile) {
        return <div className="flex flex-col items-center justify-center text-center py-10">
            <Frown className="w-16 h-16 text-gray-400 mb-4" />
            Profile not found.
            </div>
    }

return (
    <div>
        <Card className=" mt-10 min-h-[60vh]">
            <CardHeader>
                <div className="flex justify-center items-center space-x-4">
                    <Avatar
                        src="https://via.placeholder.com/150"
                        alt="Profile Picture"
                        className="w-16 h-16 sm:w-[100px] sm:h-[100px] rounded-full border-2 border-orange-500"
                    />
                    <div>
                        <h3 className="text-lg font-semibold">{profile.email.split('@')[0] || 'User'}</h3>
                        <p className="text-sm text-gray-500">{profile.email}</p>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-gray-700">
                    Welcome to your profile page! Here you can manage your account settings,
                    view your activity, and more.
                </h3>
                <div className="mt-4 flex space-x-2">
                    <Button variant="primary">Edit Profile</Button>
                    <Button variant="secondary">Settings</Button>
                </div>
            </CardContent>
        </Card>
    </div>
)
}
