'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setProducteId } from "@/lib/Features/restaurantSlice";

export default function Productes() {
    const dispatch = useDispatch();

    const categoriaId = useSelector((state: RootState) => state.restaurant.categoriaId);
    const productesPerCategoria = useSelector((state: RootState) => state.restaurant.productes);

    const [productes, setProductes] = useState<any>([]);

    useEffect(() => {
        let productesArray = productesPerCategoria.filter((productes: any) => productes[0].categories[0].id === categoriaId);
        productesArray = productesArray.flat();
        console.log(productesArray);
        setProductes(productesArray);
    }, [productesPerCategoria]);

    return (
        <div className='pt-4 pb-5'>
            {productes.length === 0 ?
                (
                    <div className='text-center'>No hi ha productes en aquesta categoria</div>
                ) : (
                    <div className="d-flex flex-column align-items-center">
                        {productes.map((producte: any, index: number) => (
                            <Link key={index} onClick={() => dispatch(setProducteId(producte.id))} href="/menu/productes/producte" className="link">
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