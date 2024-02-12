'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setProductesCategoriaVisualitzada, setProducteId } from "@/lib/Features/getRestaurant";

export default function Productes() {

    /*PER ACCEDIR A LES DADES DE LA STORE */
    const categoriaId = useSelector((state: RootState) => state.restaurant.restaurant.categoriaId);

    /*PER GUARDAR DADES A LA STORE */
    const dispatch = useDispatch();

    const [productes, setProductes] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://127.0.0.1:8000/api/categories/${categoriaId}/productes`;
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
    }, []); // <- s'ha d'especificar una array buida com a segon argument de useEffect per a que només s'executi un cop. Si no s'especifica res el hook useEffect s'executarà de manera infinita


    useEffect(() => {
        dispatch(setProductesCategoriaVisualitzada(productes));
    }, [productes]); // This useEffect logs and dispatches when productes changes

    return (
        <div className='pt-4 pb-5'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    {productes.map((producte) => (
                        <Link key={producte.id} onClick={() => dispatch(setProducteId(producte.id))} href="/menu/productes/producte" className="link">
                            <div className='item-categoria m-2 bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                <img className="img-producte" src="/salad.png" alt="" />
                                <div className='pb-3 text-center fw-bold text-uppercase'>
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