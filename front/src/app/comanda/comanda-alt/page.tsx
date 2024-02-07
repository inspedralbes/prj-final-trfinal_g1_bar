'use client'

import React, { useState, useEffect } from 'react';

export default function ComandaAlternativa() {

    const id = 1; // HARDCODED ID TICKET
    const [tiquet, setTiquet] = useState<any>([]);
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
            const formattedUsers : any = formatUsuaris();
            setArrayUsuaris(formattedUsers);
        }
    }, [tiquet]);

    /*
    * return arrayUsuaris retorna un array de valors únics integer, els identificadors de tots els usuaris inclosos en un tiquet
    */
    function formatUsuaris() {
        let arrayUsuaris : Array<number> = [];
        let producteTiquet : any;

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
                {arrayUsuaris.map((usuari, i) => (
                    <div key={i} className='mb-2'>
                        <div className='position-relative mb-4'>
                            <div className='user-name-decoration position-absolute'></div>
                            <p className='user-name position-absolute bg-white px-2'>ID_USUARI: {usuari}</p>
                        </div>
                        <div className='d-flex flex-row gap-4 horizontal-scroll-container py-4'>
                            {tiquet.tiquets.map((producte: any, j : number) => (
                                // Renderitza la informació del producte sempre i quan usuari sigui igual a product.pivot.user_id
                                usuari === producte.pivot.user_id && (
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