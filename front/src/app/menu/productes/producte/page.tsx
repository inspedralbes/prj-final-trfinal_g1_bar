'use client'

import React, { useState, useEffect } from 'react';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { setTiquetIndividual } from "@/lib/Features/getRestaurant";
import { useRouter } from 'next/navigation';

export default function Producte() {

    // GET AND SET STORE DATA
    const productesCategoriaSeleccionada = useSelector((state: RootState) => state.restaurant.restaurant.productesCategoriaVisualitzada);
    const producteId = useSelector((state: RootState) => state.restaurant.restaurant.producteId);
    const tiquetIndividual = useSelector((state: RootState) => state.restaurant.restaurant.tiquetIndividual);
    const dispatch = useDispatch();

    // NAVEGAR ENTRE PAGINES
    const { push } = useRouter();   

    //
    let producteSeleccionat : any;

    for (let i = 0; i < productesCategoriaSeleccionada.length; i++) {
        if (productesCategoriaSeleccionada[i].id === producteId) {
            producteSeleccionat = productesCategoriaSeleccionada[i];
        }
    }

    // CONTROLAR QUANTITAT DE PRODUCTE
    const [quantitat, setQuantitat] = useState(1);

    function suma() {
        setQuantitat(quantitat + 1);
    };

    function resta() {
        if (quantitat > 1) {
            setQuantitat(quantitat - 1);
        }
    };

    // AFEGIR PRODUCTE AL TIQUET INDIVIDUAL
    function afegirProducteTiquetIndividual() {

        const producteTiquet = {
            tiquet_id: 1,
            producte_id: producteSeleccionat.id,
            quantitat: quantitat
        };

        // Enviem producteTiquet a node amb sockets. Serà el socket que farà la crida API
        
        dispatch(setTiquetIndividual([producteTiquet]));
        push('/menu/productes');
    }

    return (
        <div className='pt-4 pb-5'>
            <div className="container px-6">
                <div className='row'>
                    <div className='item-producte bg-zinc-300 rounded shadow d-flex flex-column justify-content-center align-items-center'>
                        <img className="img-producte" src="/salad.png" alt="" />
                    </div>
                </div>
                <div className='mt-3 row'>
                    <div className="botonsSumaResta p-0">
                        <button onClick={resta}>-</button>
                        <input type="number" readOnly value={quantitat}></input>
                        <button onClick={suma}>+</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <h2 className="p-0 fw-bold text-uppercase">{producteSeleccionat.nom}</h2>
                    <h3 className="p-0">{producteSeleccionat.preu} &euro;</h3>
                    <p className="p-0 font-italic">{producteSeleccionat.descripcio}</p>
                </div>
                <div className='mt-3 row'>
                    <button onClick={afegirProducteTiquetIndividual} type="button" className="col-6 btn btn-primary float-right">AFEGIR A LA COMANDA</button>
                </div>
                <div className='row mt-3'>
                    <div className='modificar-ingredients px-4 py-2 bg-zinc-300 d-flex justify-content-between align-items-center'>
                        <p className='m-0'>MODIFICAR INGREDIENTS</p>
                        <button className='d-flex justify-content-center align-items-center bg-secondary bg-opacity-75'>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}