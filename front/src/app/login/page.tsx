'use client'

import Link from 'next/link';
import React, { useState } from 'react';
import './styles.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const url = `api/login`;

    const loginApiFetch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // no recarrega la pagina

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email, 
                password: password
             })
        });
        const data = await response.json();

        const token = data.token;

        const user = {
            email: email,
            password: password,
            token: token
        }

        localStorage.setItem('user', JSON.stringify(user));
    };

    return (
        <div className='login-container w-80 mx-auto mt-5 border rounded p-4'>
            <h1 className='text-center mb-4'>Login</h1>
            <form onSubmit={loginApiFetch} className='d-flex flex-column'>
                <label className='mb-3'>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className='w-100 p-2 border rounded'/>
                </label>
                <label className='mb-3'>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className='w-100 p-2 border rounded'/>
                </label>
                <input type="submit" value="Submit" className='p-2 bg-primary rounded border-0 text-white pe-auto'/>
            </form>
            <p className='text-center mt-3'>No t'has registrat? <Link href='/register'>Registrat</Link></p>
        </div>
    );
}