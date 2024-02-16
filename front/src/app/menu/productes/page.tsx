'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setProducteSelecctionat } from "@/lib/Features/restaurantSlice";
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { IconArrowLeft } from '@tabler/icons-react';

export default function Productes() {
    const dispatch = useDispatch();
    const { push } = useRouter();

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
        <div className='py-3'>
            <Button onClick={() => push('/menu')} className="mb-2 ml-3 shadow">
                <div className='flex align-items-center'>
                    <IconArrowLeft size={24} />
                    <div className='mr-2 ml-1'>
                        Enrere
                    </div>
                </div>
            </Button>
            <div className="d-flex flex-column align-items-center">
                {productes.map((producte: any, index: number) => (
                    <Link key={index} onClick={() => dispatch(setProducteSelecctionat(producte))} href="/menu/productes/producte" className="link">
                        <div className='item-categoria m-2 bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                            <img className="img-producte" src="/salad.png" alt="" />
                            <div className='pb-3 text-center fw-bold text-uppercase'>
                                {producte.nom}
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}