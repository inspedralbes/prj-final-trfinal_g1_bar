'use client'

import React, { useState, useEffect } from 'react';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';

export default function Producte() {

    let productesCategoriaSeleccionada = useSelector((state: RootState) => state.restaurant.restaurant.productesCategoriaVisualitzada);
    const producteId = useSelector((state: RootState) => state.restaurant.restaurant.producteId);

    let producteSeleccionat;

    for (let i = 0; i < productesCategoriaSeleccionada.length; i++) {
        if (productesCategoriaSeleccionada[i].id === producteId) {
            producteSeleccionat = productesCategoriaSeleccionada[i];
        }
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
                    <div className="butonsSumaResta p-0">
                        <button className="botonsLandingLog">-</button>
                        <input type="number" className="inputN"></input>
                        <button className="botonsLandingLog">+</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <h2 className="p-0 fw-bold text-uppercase">{producteSeleccionat.nom}</h2>
                    <h3 className="p-0">{producteSeleccionat.preu} &euro;</h3>
                    <p className="p-0 font-italic">{producteSeleccionat.descripcio}</p>
                </div>
                <div className='row mt-4'>
                    <div className='modificar-ingredients px-4 py-2 bg-zinc-300 d-flex justify-content-between align-items-center'>
                        <p className='m-0'>MODIFICAR INGREDIENTS</p>
                        <button className='d-flex justify-content-center align-items-center bg-secondary bg-opacity-75'>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
}