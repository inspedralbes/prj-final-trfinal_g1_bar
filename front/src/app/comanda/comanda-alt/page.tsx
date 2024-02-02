'use client'

import React, { useState, useEffect } from 'react';

export default function ComandaAlternativa() {

    const id = 1; // HARDCODED ID TICKET
    const [tiquet, setTiquet] = useState([]);
    const [loading, setLoading] = useState(true);
    const url = `http://localhost:8000/api/tiquets/${id}`;

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

    function formatUsuaris() {
        let arrayUsuaris = [];
        for (let i = 0; i < tiquet.tiquets.length; i++) {
            producteTiquet = tiquet.tiquets[i];
            producteTiquet.pivot.user_id;
        }
    }

    return (
        <div className="d-flex flex-column align-items-center">
       {tiquet.tiquets.map((product, index) => (
        <div key={index}>
          <p>ID: {product.id}</p>
          <p>Name: {product.nom}</p>
          <p>Description: {product.descripcio}</p>
          {/* Render other properties as needed */}
        </div>
      ))}
        </div>
    )
}