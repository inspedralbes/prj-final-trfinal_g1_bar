'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "@/lib/Features/userSlice";
import { RootState } from '@/lib/store';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import GlobalConfig from '../app.config'

export default function Productes() {
    const router = useRouter();
    const dispatch = useDispatch();
    const userToken = useSelector((state: RootState) => state.user.token);

    const url = GlobalConfig.link + "/api/logout";

    const [loading, setLoading] = useState(false);

    const logoutLaravel = async () => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userToken}`,
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

        dispatch(logout());                 // Tanca la sessió a Redux
        localStorage.removeItem('user');    // Tanca la sessió a localStorage
        router.push('/');                   // Redirigeix a la pàgina principal
    }

    return (
        <div className='w-80 mx-auto mt-4'>
            {loading ? (
                <div className='d-flex justify-content-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    {!userToken ? (
                        <Alert variant="info">
                            <Alert.Heading className='text-center'>Sessió Tancada</Alert.Heading>
                            <div className='d-flex'>
                                <Button onClick={() => router.push('/')} variant="primary" className='mx-auto mt-2'>
                                    Inici
                                </Button>
                            </div>
                        </Alert>
                    ) : (
                        <Alert variant="warning" className='shadow border'>
                            <Alert.Heading className='text-center'>Estàs segur?</Alert.Heading>
                            <p>
                                Estàs a punt de tancar la teva sessió, estàs segur?
                            </p>
                            <hr />
                            <div className="d-flex justify-content-between">
                                <Button onClick={() => router.push('/')} variant="outline-success">
                                    Inici
                                </Button>
                                <Button onClick={logoutLaravel} variant="outline-danger">
                                    Tancar Sessió
                                </Button>
                            </div>
                        </Alert>
                    )}
                </div>
            )}
        </div>
    );
}