'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { fetchProfile } from '../../utils/fetchProfile';
import protectedRoute from '../../utils/protectRoute';

function Profile() {
    const { data: session } = useSession();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (session) {
            fetchProfile(session.accessToken).then(setProfile).catch(console.error);
        }
    }, [session]);

    if (!profile) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Your Profile</h1>
    <p>Username: {profile.username}</p>
    <p>Email: {profile.email}</p>
    </div>
);
}

export default protectedRoute(Profile);
