'use client'

import React, { useState } from 'react';
import Link from 'next/link';
import './styles.css';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const url = `api/register`;

    const registerApiFetch = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // no recarrega la pagina

        if (password !== confirmPassword) {
            alert("Les contrasenyes no coincideixen!");
            return;
        }

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                name: name,
                email: email, 
                password: password,
                password_confirmation: confirmPassword
            }),
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
        <div className='register-container'>
            <h1>Register</h1>
            <form onSubmit={registerApiFetch}>
                <label>
                    Nom:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} required />
                </label>
                <label>
                    Email:
                    <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
                </label>
                <label>
                    Contrasenya:
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                </label>
                <label>
                    Confirma la contrasenya:
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                </label>
                <input type="submit" value="Submit" />
            </form>
            <p className='register-link'>Ja t'has registrat? <Link href='/login'>Inicia sessió</Link></p>
        </div>
    );
}