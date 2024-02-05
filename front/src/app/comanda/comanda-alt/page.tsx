'use client'

import React, { useState, useEffect } from 'react';

export default function ComandaAlternativa() {

    const id = 1; // HARDCODED ID TICKET
    const [tiquet, setTiquet] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://localhost:8000/api/tiquets/${id}`;
    const [arrayUsuaris, setArrayUsuaris] = useState([]);

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

    useEffect(() => {
        // Call formatUsuaris only when tiquet.tiquets is defined
        if (tiquet.tiquets) {
            const formattedUsers = formatUsuaris();
            setArrayUsuaris(formattedUsers);
        }
    }, [tiquet]);


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
        <div className='pt-4 pb-5 px-6'>
            <div className="d-flex flex-column">
                {arrayUsuaris.map((usuari) => (
                    <div className='mb-5'>
                        <p className='position-relative'>ID_USUARI: {usuari}</p>
                        <div className='d-flex flex-row gap-4 items-container'>
                            {tiquet.tiquets.map((producte, index) => (
                                // Renderitza la informació del producte sempre i quan usuari sigui igual a product.pivot.user_id
                                usuari === producte.pivot.user_id && (
                                    <div key={index} className='item-categoria bg-zinc-300 rounded shadow d-flex flex-column justify-content-end align-items-center'>
                                        <img className="img-producte" src="/salad.png" alt="" />
                                        <div className='pb-3 text-center fw-bold text-uppercase'>
                                            {producte.nom}
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