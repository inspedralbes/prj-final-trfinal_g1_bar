'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "@/lib/Features/userSlice";
import { RootState } from '@/lib/store';
import Spinner from 'react-bootstrap/Spinner';

export default function Productes() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userState = useSelector((state: RootState) => state.user);

    let url = 'http://localhost:8000/api/logout';

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function logoutLaravel() {
            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${userState.token}`,
                        'Accept': 'application/json',
                    }
                });
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.log('Error al tancar la sessió');
            } finally {
                setLoading(false);
            }
        }

        logoutLaravel();                    // Tanca la sessió a Laravel
        dispatch(logout());                 // Tanca la sessió a Redux
        localStorage.removeItem('user');    // Tanca la sessió a localStorage
        router.push('/');                   // Redirigeix a la pàgina principal
    }, []);

    return (
        <div className='m-3'>
            {loading ? (
                <div className='d-flex justify-content-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>Sessió Tancada</div>
            )}
        </div>
    );
}