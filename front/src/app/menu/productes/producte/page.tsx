'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Producte({ id }) {
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
                <div className="container px-6">
                    <div className='row'>
                        <div key={productes[0].id} className='item-producte bg-zinc-300 rounded shadow d-flex flex-column justify-content-center align-items-center'>
                            <img className="img-producte" src="/salad.png" alt="" />
                        </div>
                    </div>
                    <div className='mt-3 row'>
                        <div className="butonsSumaResta p-0">
                            <button className="botonsLandingLog">-</button>
                            <input type="number" className="inputN"></input>
                            <button className="botonsLandingLog">+</button>
                        </div>
                    </div>
                    <div className='row mt-3'>
                        <h2 className="p-0 fw-bold text-uppercase">{productes[0].nom}</h2>
                        <h3 className="p-0">{productes[0].preu} &euro;</h3>
                        <p className="p-0 font-italic">{productes[0].descripcio}</p>
                    </div>
                    <div className='row mt-4'>
                        <div className='modificar-ingredients px-4 py-2 bg-zinc-300 d-flex justify-content-between align-items-center'>
                            <p className='m-0'>MODIFICAR INGREDIENTS</p>
                            <button className='d-flex justify-content-center align-items-center bg-secondary bg-opacity-75'>+</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}