'use client'

import React, { useState, useEffect } from 'react';
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';

export default function ComandaAlternativa() {

    const comandaTaula = useSelector((state: RootState) => state.restaurant.tiquetTaula);
    const [arrayUsuaris, setArrayUsuaris] = useState([]);
    console.log("COMANDA TAULA", comandaTaula)
    const comandaIndividual = useSelector((state: RootState) => state.restaurant.tiquetIndividual);
    console.log("COMANDA INDIVIDUAL", comandaIndividual);
    
    // Quan hem obtingut les dades associades a un tiquet...
    useEffect(() => {
        if (comandaTaula) {
            const formattedUsers : any = formatUsuaris();
            setArrayUsuaris(formattedUsers);
        }
    }, [comandaTaula]);

    /*
    * return arrayUsuaris retorna un array de valors únics integer, els identificadors de tots els usuaris inclosos en un tiquet
    */
    function formatUsuaris() {
        let arrayUsuaris : Array<number> = [];

        for (let i = 0; i < comandaTaula.length; i++) {
            if (!arrayUsuaris.some(usuari_id => usuari_id == comandaTaula[i].usuari_id)) {
                arrayUsuaris.push(comandaTaula[i].usuari_id)
            }
        }

        return arrayUsuaris;
    }

    return (
        <div className='pt-4 pb-5 px-6'>
            <div className="d-flex flex-column">
                {arrayUsuaris.map((usuari, i) => (
                    <div key={i} className='mb-2'>
                        <div className='position-relative mb-4'>
                            <div className='user-name-decoration position-absolute'></div>
                            <p className='user-name position-absolute bg-white px-2'>ID_USUARI: {usuari}</p>
                        </div>
                        <div className='d-flex flex-row gap-4 horizontal-scroll-container py-4'>
                            {comandaTaula.map((producte: any, j : number) => (
                                // Renderitza la informació del producte sempre i quan usuari sigui igual a product.pivot.user_id
                                usuari === producte.usuari_id && (
                                    <div>
                                        <div key={j} className='item-categoria bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                            <img className="img-producte" src="/salad.png" alt="" />
                                            <div className='pb-3 text-center fw-bold text-uppercase'>
                                                {producte.nom}
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}