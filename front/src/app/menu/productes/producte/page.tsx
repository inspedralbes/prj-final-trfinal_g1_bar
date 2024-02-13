'use client'

import React, { useState, useEffect } from 'react';
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from 'react-redux';
import { addTiquetIndividual } from "@/lib/Features/restaurantSlice";
import { useRouter } from 'next/navigation';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import GlobalConfig from '../../../app.config'

export default function Producte() {

    // GET AND SET STORE DATA
    const productesCategoriaSeleccionada : any = useSelector((state: RootState) => state.restaurant.productesCategoriaVisualitzada);
    const producteId = useSelector((state: RootState) => state.restaurant.producteId);
    const tiquetIndividual = useSelector((state: RootState) => state.restaurant.tiquetIndividual);
    const dispatch = useDispatch();

    // NAVEGAR ENTRE PAGINES
    const { push } = useRouter();

    // FETCH DATA
    const [ingredients, setIngredients] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    const url = GlobalConfig.link + `/api/productes/${producteId}/ingredients`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setIngredients(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // <- s'ha d'especificar una array buida com a segon argument de useEffect per a que només s'executi un cop. Si no s'especifica res el hook useEffect s'executarà de manera infinita

    //
    let producteSeleccionat: any;

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

    // CONTROLAR MODIFICAR INGREDIENTS
    // Estat per gestionar els ingredients marcats
    const [uncheckedIngredientsCheckboxes, setUncheckedIngredientsCheckboxes] = useState([]);

    // Gestionem els canvis dels inputs checkbox dels ingredients
    const handleCheckboxChange = (index: any) => {
        const updatedCheckedCheckboxes: any = [...uncheckedIngredientsCheckboxes];
        updatedCheckedCheckboxes[index] = !updatedCheckedCheckboxes[index];
        setUncheckedIngredientsCheckboxes(updatedCheckedCheckboxes);
    };

    // Selecciona aquells ingredients els checkbox dels quals estàn desmarcats
    function getUncheckedIngredients() {
        const checked : any = [];
        const unchecked : any = [];

        ingredients.forEach((ingredient: any, index : number) => {
            if (uncheckedIngredientsCheckboxes[index]) {
                unchecked.push(ingredient.nom);
            } else {
                checked.push(ingredient.nom);
            }
        });

        return unchecked;
    };

    // Dóna format als comentari eliminar ingredients d'un producte
    function formatComentariEliminarIngredient(uncheckedIngredients : any) {
        let comentari = "";

        for (let i = 0; i < uncheckedIngredients.length; i++) {
            comentari = comentari.concat('Sense ', uncheckedIngredients[i], ". ");
            
        }
        
        return comentari;
    }

    // AFEGIR PRODUCTE AL TIQUET INDIVIDUAL
    function afegirProducteTiquetIndividual() {

        let uncheckedIngredients = getUncheckedIngredients();
        let comentari = formatComentariEliminarIngredient(uncheckedIngredients);

        const producteTiquet = {
            tiquet_id: 1,
            producte_id: producteSeleccionat.id,
            nom: producteSeleccionat.nom,
            descripcio: producteSeleccionat.descripcio,
            preu: producteSeleccionat.preu,
            quantitat: quantitat,
            comentari: comentari
        };

        console.log(producteTiquet);
        // Enviem producteTiquet a node amb sockets. Serà el socket que farà la crida API
        
        dispatch(addTiquetIndividual([producteTiquet]));
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
                    <h2 className="p-0 fw-bold text-uppercase">{producteSeleccionat?.nom}</h2>
                    <h3 className="p-0">{producteSeleccionat?.preu} &euro;</h3>
                    <p className="p-0 m-0 font-italic">{producteSeleccionat?.descripcio}</p>
                </div>
                <div className='row mt-3'>
                    <Accordion className='p-0'>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>MODIFICAR INGREDIENTS</Accordion.Header>
                            <Accordion.Body>
                                <form action="">
                                    <div className="d-flex flex-column">
                                        {ingredients.map((ingredient: any, i: number) => (
                                            <div key={i} className="form-check form-switch p-0 mb-2 custom-form-check">
                                                <div className="w-100 d-inline-flex flex-row-reverse justify-content-between gap-3">
                                                    <input className="form-check-input ms-0" type="checkbox" role="switch" id={`ing-${i}`} defaultChecked onChange={() => handleCheckboxChange(i)}/>
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
                    <button onClick={afegirProducteTiquetIndividual} type="button" className="col-6 btn btn-primary float-right">AFEGIR A LA COMANDA</button>
                </div>
            </div>
        </div>
    );
}