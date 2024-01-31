'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Menu({ id }) {
    const i = 1;
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://127.0.0.1:8000/api/restaurants/${i}/categories`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setCategories(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [i]);

    return (
        <div className='pt-4'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    {categories.map((category) => (
                        <Link href="/qr" className="link">
                            <div key={category.id} className='item-categoria m-2 bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                <img src="/salad.png" alt="" />
                                <div className='pb-3 text-uppercase'>
                                    {category.nom}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}