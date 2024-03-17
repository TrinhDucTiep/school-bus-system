"use client";

import { useEffect, useState } from 'react';
import { redirect } from 'next/navigation';

export default function OAuth2Callback() {
    const [refreshToken, setRefreshToken] = useState<string | null>('');
    const [accessToken, setAccessToken] = useState<string | null>('');

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const refreshToken = urlParams.get('refreshToken');

        if (token) {
            console.log('token', token);
            setAccessToken(token);
            localStorage.setItem('accessToken', token);
            setRefreshToken(refreshToken);
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }

            redirect('/');
        }
    }, []);

    return null;
}