'use client'

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import './pagament.modules.css'

export default function Pagament() {
    const id = 1; // HARDCODED ID TICKET
    const myID = 3;
    const [tiquet, setTiquet] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://localhost:8000/api/tiquets/${id}`;
    const [arrayUsuaris, setArrayUsuaris] = useState([]);
    const [seleccioProductes, setSeleccioProductesState] = useState('els-meus-productes');
    const [checkboxState, setCheckboxState] = useState({});

    // Obtenció de les dades associades a un tiquet
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                setTiquet(data);
                console.log(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []); // <- s'ha d'especificar una array buida com a segon argument de useEffect per a que només s'executi un cop. Si no s'especifica res el hook useEffect s'executarà de manera infinita

    // Quan hem obtingut les dades associades a un tiquet...
    useEffect(() => {
        if (tiquet.tiquets) {
            const formattedUsers = formatUsuaris();
            setArrayUsuaris(formattedUsers);
        }
    }, [tiquet]);

    /*
    * return arrayUsuaris retorna un array de valors únics integer, els identificadors de tots els usuaris inclosos en un tiquet
    */
    function formatUsuaris() {
        let arrayUsuaris = [];
        let producteTiquet;

        for (let i = 0; i < tiquet.tiquets.length; i++) {
            producteTiquet = tiquet.tiquets[i];
            if (!arrayUsuaris.some((usuari_id) => usuari_id == producteTiquet.pivot.user_id)) {
                arrayUsuaris.push(producteTiquet.pivot.user_id);
            }
        }
        console.log(arrayUsuaris);
        return arrayUsuaris;
    }

    const canviSeleccioProducte = (event) => {

        setSeleccioProductesState(event.target.id);
        uncheckAllCheckboxes();

        if (event.target.id === 'els-meus-productes') {
            marcaElsMeusProductes(myID);
        } else if (event.target.id === 'tot') {
            marcaTotsElsProductes();
        } else if (event.target.id === 'personalitzat') {
            console.log('personalitzat')
        }
    };

    // Funció que desmarca tots els productes del ticket
    function uncheckAllCheckboxes() {
        setCheckboxState({});
    };

    const handleCheckboxChange = (id) => {
        setCheckboxState((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // Funció que marca tots els meus productes del ticket
    function marcaElsMeusProductes(usuari_id) {
        const updatedCheckboxState = {};

        tiquet.tiquets.forEach((producte, j) => {
            const checkboxId = `it-${j}_u-${usuari_id}`;
            updatedCheckboxState[checkboxId] = true;
        });

        setCheckboxState(updatedCheckboxState);
    };

    // Funció que marca tots els productes del ticket
    function marcaTotsElsProductes() {
        const updatedCheckboxState = {};

        arrayUsuaris.forEach((usuari) => {
            tiquet.tiquets.forEach((producte, j) => {
                const checkboxId = `it-${j}_u-${usuari}`;
                updatedCheckboxState[checkboxId] = true;
            });
        });

        setCheckboxState(updatedCheckboxState);
    };

    const isCheckboxChecked = (id) => checkboxState[id] || false;

    const isAllCheckboxesChecked = () => {

        if (!tiquet.tiquets || tiquet.tiquets.length === 0) {
            return false;
        }

        let totalCheckboxes = 0;
        
        for (let i = 0; i < arrayUsuaris.length; i++) {
            for (let j = 0; j < tiquet.tiquets.length; j++) {
                if (arrayUsuaris[i] === tiquet.tiquets[j].pivot.user_id){
                    if (isCheckboxChecked(`it-${j}_u-${arrayUsuaris[i]}`)) {
                        totalCheckboxes++;
                    }
                }
            }
        }

        /*console.log("TOT")
        console.log("checkbox emplenades", totalCheckboxes)
        console.log("productes totals", tiquet.tiquets.length)*/
        return totalCheckboxes === tiquet.tiquets.length;
    };

    const isAllCheckedForMyID = () => {
        if (!tiquet.tiquets || tiquet.tiquets.length === 0) {
            return false;
        }

        const totalCheckboxesForMyID = arrayUsuaris.reduce((acc, usuari) => {
            return (
                acc +
                tiquet.tiquets.filter(
                    (producte, j) => isCheckboxChecked(`it-${j}_u-${usuari}`) && usuari === myID
                ).length
            );
        }, 0);


        let totalProductsForMyID = 0;

        for (let i = 0; i < tiquet.tiquets.length; i++) {
            if (tiquet.tiquets[i].pivot.user_id === myID) {
                totalProductsForMyID++;
            }
        }

        /*console.log("EL MEU ID")
        console.log("checkbox emplenades", totalCheckboxesForMyID)
        console.log("productes totals", totalProductsForMyID)*/
        return totalCheckboxesForMyID === totalProductsForMyID;
    };

    const updateRadioButtons = () => {
        
        if (isAllCheckboxesChecked()) {
            setSeleccioProductesState('tot');
            //console.log("ENTRO A TOTS ELS PRODUCTES")
        } else if (isAllCheckedForMyID()) {
            setSeleccioProductesState('els-meus-productes');
            //console.log("ENTRO A ELS MEUS PRODUCTES")
        } else {
            setSeleccioProductesState('personalitzat');
            //console.log("ENTRO A PERSONALITZAT")
        }
    };

    useEffect(() => {
        updateRadioButtons();
    }, [checkboxState]);

    function clickBotoPagament() {
        console.log("HAS FET CLIC AL BOTÓ DE PAGAMENT");
    }

    if (loading) {
        return <p>Loading...</p>; // Optionally, you can show a loading indicator
    }

    return (
        <div className='pt-4 pb-5 px-4'>
            <div className='card mb-4'>
                <div className='card-body'>
                    Vull pagar:
                    <Form className='my-3 mx-4'>
                        <div key={'default-radio'} className='mb-3'>
                            <Form.Check
                                type='radio'
                                name='forma-pagament'
                                id='els-meus-productes'
                                label='Els meus productes'
                                checked={seleccioProductes === 'els-meus-productes'}
                                onChange={canviSeleccioProducte}
                            />
                            <Form.Check
                                type='radio'
                                name='forma-pagament'
                                id='tot'
                                label='Tot'
                                checked={seleccioProductes === 'tot'}
                                onChange={canviSeleccioProducte}
                            />
                            <Form.Check
                                type='radio'
                                name='forma-pagament'
                                id='personalitzat'
                                label='Personalitzat'
                                checked={seleccioProductes === 'personalitzat'}
                                onChange={canviSeleccioProducte}
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div className='card mb-4'>
                <Form className='my-3 mx-4'>
                    {arrayUsuaris.map((usuari, i) => (
                        <div key={i} className='mb-2'>
                            <p>ID_USUARI: {usuari}</p>
                            <div>
                                {tiquet.tiquets.map((producte, j) => (
                                    // Renderitza la informació del producte sempre i quan usuari sigui igual a product.pivot.user_id
                                    usuari === producte.pivot.user_id && (
                                        <div key={j}>
                                            <Form.Check
                                                className='text-uppercase'
                                                type='checkbox'
                                                id={`it-${j}_u-${usuari}`}
                                                label={`${producte.nom} ${producte.preu} * ${producte.pivot.quantitat} ${parseFloat(
                                                    producte.preu * producte.pivot.quantitat
                                                ).toFixed(2)}`}
                                                checked={checkboxState[`it-${j}_u-${usuari}`] || false}
                                                onChange={() => handleCheckboxChange(`it-${j}_u-${usuari}`)}
                                            />
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    ))}
                </Form>
            </div>
            <div className='card mb-4'>
                <div className='card-body'>
                    Mètode de pagament:
                    <div className='d-flex justify-content-center mt-3'>
                        <form className='d-flex flex-row gap-3' action="">
                            <label>
                                <input className="metode-pagament" type="radio" name="forma-pagament" value="visa" checked />
                                <img src="/visa-logo.png" alt="Option 1" width="100" height="100" />
                            </label>
                            <label className='d-none'>
                                <input className="metode-pagament" type="radio" name="forma-pagament" value="crypto" checked />
                                <img src="/bizum-logo.webp" alt="Option 1" width="100" height="100" />
                            </label>
                            <label>
                                <input className="metode-pagament" type="radio" name="forma-pagament" value="crypto" checked />
                                <img src="/bitcoin-logo.png" alt="Option 1" width="100" height="100" />
                            </label>
                        </form>
                    </div>
                </div>
            </div>
            <button onClick={clickBotoPagament} type="button" className="p-2 btn btn-primary float-right">REALITZAR PAGAMENT</button>
        </div>
    );
}