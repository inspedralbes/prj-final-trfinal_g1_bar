'use client'

import React from 'react';
import Link from 'next/link';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setCategoriaId } from "@/lib/Features/restaurantSlice";
import { useRouter } from 'next/navigation';
import { Button } from 'react-bootstrap';
import { IconArrowLeft } from '@tabler/icons-react';

export default function Menu() {
    const dispatch = useDispatch();
    const { push } = useRouter();

    const categories = useSelector((state: RootState) => state.restaurant.categories);

    return (
        <div className='py-3'>
            <Button onClick={() => push('/')} className="mb-2 ml-3 shadow">
                <div className='flex align-items-center'>
                    <IconArrowLeft size={24} />
                    <div className='mr-2 ml-1'>
                        Inici
                    </div>
                </div>
            </Button>
            <div className="d-flex flex-column align-items-center">
                {categories.map((category: any) => (
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
        </div>
    );
}