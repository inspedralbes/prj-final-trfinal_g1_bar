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
        <div className='login-container'>
            <h1>Login</h1>
            <form onSubmit={loginApiFetch}>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p className='register-link'>No t'has registrat? <Link href='/register'>Registrat</Link></p>
        </div>
    );
}