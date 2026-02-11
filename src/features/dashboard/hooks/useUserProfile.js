import React from "react"
import { 
    getProfile as getProfileAPI,
    updateUserProfile as updateUserProfileAPI,
    
} from "../api/dashboard.api"

export function useUserProfile() {
    const [profile, setProfile] = React.useState(null)
    const [profileLoading, setProfileLoading] = React.useState(false)
    const [profileError, setProfileError] = React.useState(null)

    const fetchProfile = React.useCallback(async () => {
        setProfileLoading(true)
        setProfileError(null)
        try {
        const data = await getProfileAPI()
        setProfile(data)
        return data
        } catch (err) {
        console.error('Get profile error:', err)
        setProfileError(err?.message || 'Failed to fetch profile')
        throw err
        } finally {
        setProfileLoading(false)
        }
    }, [])

    const updateUserProfile = React.useCallback(async (profileData) => {
        try {
        await updateUserProfileAPI(profileData)
        await fetchProfile() 
        } catch (err) {
        console.error('Update profile error:', err)
        throw new Error(err?.message || 'Failed to update profile')
        }
    }, [fetchProfile])

    return {
        profile,
        profileLoading,
        profileError,
        fetchProfile,
        updateUserProfile,
    }
}