'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Productes({ id }) {
    const i = 2;

    const [productes, setProductes] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://127.0.0.1:8000/api/categories/${i}/productes`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setProductes(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [i]);

    return (
        <div className='pt-4 pb-5'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    {productes.map((producte) => (
                        <Link href="/menu/productes/producte" className="link">
                            <div key={producte.id} className='item-categoria m-2 bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                <img className="img-producte" src="/salad.png" alt="" />
                                <div className='pb-3 fw-bold text-uppercase'>
                                    {producte.nom}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}