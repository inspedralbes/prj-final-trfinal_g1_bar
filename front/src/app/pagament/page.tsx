'use client'

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';

export default function Pagament() {

    const id = 1; // HARDCODED ID TICKET
    const [tiquet, setTiquet] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://localhost:8000/api/tiquets/${id}`;
    const [arrayUsuaris, setArrayUsuaris] = useState([]);

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
                console.log(data)
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
            if (!arrayUsuaris.some(usuari_id => usuari_id == producteTiquet.pivot.user_id)) {
                arrayUsuaris.push(producteTiquet.pivot.user_id)
            }
        }
        console.log(arrayUsuaris);
        return arrayUsuaris;
    }

    return (
        <div className='pt-4 pb-5 px-5'>
            <div className="card mb-4">
                <div className="card-body">
                    Vull pagar:
                    <Form className='my-3 mx-4'>
                        <div key={'default-radio'} className="mb-3">
                            <Form.Check // prettier-ignore
                                type='radio'
                                name='forma-pagament'
                                id='els-meus-productes'
                                label='Els meus productes'
                                defaultChecked 
                            />
                            <Form.Check // prettier-ignore
                                type='radio'
                                name='forma-pagament'
                                id='tot'
                                label='Tot'
                            />
                            <Form.Check // prettier-ignore
                                type='radio'
                                name='forma-pagament'
                                id='personalitzat'
                                label='Personalitzat'
                            />
                        </div>
                    </Form>
                </div>
            </div>
            <div className="card p-3">
                {arrayUsuaris.map((usuari, i) => (
                    <div key={i} className='mb-2'>
                        <p>ID_USUARI: {usuari}</p>
                        <div>
                            {tiquet.tiquets.map((producte, j) => (
                                // Renderitza la informació del producte sempre i quan usuari sigui igual a product.pivot.user_id
                                usuari === producte.pivot.user_id && (
                                    <div key={j}>
                                        <div className='text-uppercase'>
                                            {producte.nom} {producte.preu} * {producte.pivot.quantitat} {parseFloat(producte.preu * producte.pivot.quantitat).toFixed(2)}
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}