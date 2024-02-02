'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setCategoriaId } from "@/lib/Features/getRestaurant";

export default function Menu() {

    /*PER ACCEDIR A LES DADES DE LA STORE */
    const restaurantId = useSelector((state: RootState) => state.restaurant.restaurant.restaurantId);

    /*PER GUARDAR DADES A LA STORE */
    const dispatch = useDispatch();

    /* 
    *   useState() es un Hook de React que te permite agregar una variable de estado a tu componente: const [state, setState] = useState(initialState)
    *   1) initialState: el valor que deseas que tenga el estado inicialmente
    *   2) state: el estado actual
    *   3) setState: la función set que permite actualizar el estado a un valor diferente y desencadenar un nuevo renderizado
    */

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://127.0.0.1:8000/api/restaurants/${restaurantId}/categories`;
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
    }, []); // <- s'ha d'especificar una array buida com a segon argument de useEffect per a que només s'executi un cop. Si no s'especifica res el hook useEffect s'executarà de manera infinita

    return (
        <div className='pt-4 pb-5'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="d-flex flex-column align-items-center">
                    {categories.map((category) => (
                        <Link key={category.id} onClick={() => dispatch(setCategoriaId(category.id))} href="/menu/productes" className="link">
                            <div className='item-categoria m-2 bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                <img className="img-producte" src="/salad.png" alt="" />
                                <div className='pb-3 fw-bold text-uppercase'>
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