'use client'

import React, { useState, useEffect } from 'react';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { addTiquetIndividual } from "@/lib/Features/restaurantSlice";
import { useRouter } from 'next/navigation';
import Accordion from 'react-bootstrap/Accordion';

export default function Producte() {
    const { push } = useRouter();
    const dispatch = useDispatch();

    const producteSeleccionat = useSelector((state: RootState) => state.restaurant.producteSeleccionat);
    const tiquetId = useSelector((state: RootState) => state.restaurant.tiquetId);

    const [quantitat, setQuantitat] = useState(1);
    const [uncheckedIngredientsCheckboxes, setUncheckedIngredientsCheckboxes] = useState([]);

    const suma = () => setQuantitat(quantitat + 1);
    const resta = () => quantitat > 1 ? setQuantitat(quantitat - 1) : null;

    // Gestionem els canvis dels inputs checkbox dels ingredients
    const handleCheckboxChange = (index: any) => {
        const updatedCheckedCheckboxes: any = [...uncheckedIngredientsCheckboxes];
        updatedCheckedCheckboxes[index] = !updatedCheckedCheckboxes[index];
        setUncheckedIngredientsCheckboxes(updatedCheckedCheckboxes);
    };

    // Afegir producte al tiquet individual
    function afegirProducteTiquetIndividual() {

        // Obtenim els ingredients que no estan seleccionats
        let uncheckedIngredients = producteSeleccionat.ingredients
            .filter((_: any, index: number) => uncheckedIngredientsCheckboxes[index])
            .map((ingredient: any) => ingredient.nom);

        // Creem un string amb els ingredients que no estan seleccionats
        let comentari = uncheckedIngredients.map((ingredient: any) => `Sense ${ingredient}. `).join('');

        const producteTiquet = {
            tiquet_id: tiquetId,
            producte_id: producteSeleccionat.id,
            nom: producteSeleccionat.nom,
            descripcio: producteSeleccionat.descripcio,
            preu: producteSeleccionat.preu,
            quantitat: quantitat,
            comentari: comentari
        };

        console.log(producteTiquet);

        dispatch(addTiquetIndividual([producteTiquet]));
        push('/menu/productes');
    }

    return (
        <div className='pt-4 pb-5'>
            <div className="container px-6">
                <div className='mt-3 row'>
                    <div className='item-producte bg-zinc-300 rounded shadow d-flex flex-column justify-content-center align-items-center'>
                        <img className="img-producte" src="/salad.png" alt="" />
                    </div>
                </div>
                <div className='mt-3 row'>
                    <div className="botonsSumaResta p-0 shadow">
                        <button onClick={resta}>-</button>
                        <input type="number" readOnly value={quantitat}></input>
                        <button onClick={suma}>+</button>
                    </div>
                </div>
                <div className='row mt-3'>
                    <h2 className="p-0 fw-bold text-uppercase">{producteSeleccionat?.nom}</h2>
                    <h3 className="p-0">{producteSeleccionat?.preu} &euro;</h3>
                    <p className="p-0 m-0 font-italic">{producteSeleccionat?.descripcio}</p>
                </div>
                <div className='row mt-3'>
                    <Accordion className='p-0 shadow'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Modificar Ingredients</Accordion.Header>
                            <Accordion.Body>
                                <form action="">
                                    <div className="d-flex flex-column">
                                        {producteSeleccionat.ingredients.map((ingredient: any, i: number) => (
                                            <div key={i} className="form-check form-switch p-0 mb-2 custom-form-check">
                                                <div className="w-100 d-inline-flex flex-row-reverse justify-content-between gap-3">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch" id={`ing-${i}`} defaultChecked onChange={() => handleCheckboxChange(i)} />
                                                    <label className="form-check-label" htmlFor="switchCheckLabelStart"> {ingredient.nom}</label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </form>
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </div>
                <div className='mt-3 row'>
                    <button onClick={afegirProducteTiquetIndividual} type="button" className="col-12 btn btn-primary float-right">AFEGIR A LA COMANDA</button>
                </div>
            </div>
        </div>
    );
}