'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "@/lib/Features/userSlice";
import { useRouter } from 'next/navigation';
import Spinner from 'react-bootstrap/Spinner';

export default function Login() {
    const dispatch = useDispatch();
    const { push } = useRouter();
    const userToken = useSelector((state: RootState) => state.user.token);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);
    const url = "http://localhost:8000/api/login";

    const loginApiFetch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // no recarrega la pagina
        setLoading(true);

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });
        const data = await response.json();

        if (data.error) {
            setShowAlert(true);
            setPassword('');
        } else {
            let user = {
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                token: data.token
            }
            push('/');                                              // Redirigir a la pàgina principal
            dispatch(login(user));                                  // Afegir a la store
            localStorage.setItem('user', JSON.stringify(user));     // Afegir a localStorage
        }
        setLoading(false);
    };

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
                    {userToken ? (
                        <Alert variant="primary">
                            <Alert.Heading>Ja tens una sessió iniciada</Alert.Heading>
                            <p>
                                Ja tens una sessió iniciada actualment. Si vols iniciar sessió amb un altre usuari,
                                has de tancar la sessió actual.
                            </p>
                            <hr />
                            <div className='d-flex justify-center'>
                                <Button variant="primary" className='link-underline  link-underline-opacity-0'>
                                    <Link href="/logout" className='link-underline  link-underline-opacity-0 text-white'>
                                        Tancar Sessió
                                    </Link>
                                </Button>
                            </div>
                        </Alert>
                    ) : (
                        <div>
                            <Alert variant="danger" show={showAlert} onClose={() => setShowAlert(false)} dismissible className='my-4'>
                                El email o la contrasenya no son correctes
                            </Alert>
                            <div className='login-container border rounded p-4'>
                                <h1 className='text-center mb-4'>Login</h1>
                                <form onSubmit={loginApiFetch} className='d-flex flex-column'>
                                    <label className='mb-3'>
                                        Email:
                                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className='w-100 p-2 border rounded' />
                                    </label>
                                    <label className='mb-3'>
                                        Password:
                                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className='w-100 p-2 border rounded' />
                                    </label>
                                    <input type="submit" value="Submit" className='p-2 bg-primary rounded border-0 text-white pe-auto' />
                                </form>
                                <p className='text-center mt-3'>No t'has registrat? <Link href='/register'>Registrat</Link></p>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}