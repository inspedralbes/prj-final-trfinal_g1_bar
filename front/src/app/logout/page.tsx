'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

export default function Productes() {
    
    if(localStorage.getItem('user'))
    console.log('logout', localStorage.getItem('user'));
    localStorage.removeItem('user');

    return (
        <div className='pt-4 pb-5'>
            <p>Logout...</p>
        </div>
    );
}