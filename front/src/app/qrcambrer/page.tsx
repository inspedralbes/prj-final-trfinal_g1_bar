'use client';

import React, { useState } from 'react';
import { useRef } from 'react';
import { socket } from "@/sockets";
import { useSelector } from 'react-redux';
import { RootState } from "@/lib/store";
import { } from "@/lib/Features/restaurantSlice";

export default function QR() {

    const restaurantId = useSelector((state: RootState) => state.restaurant.restaurantId);

    console.log(restaurantId);

    //ntaula es el valor del input del html
    const [ntaula, setNtaula] = useState('');

    //inputRef és el valor del input del html
    const inputRef : any = useRef();

    const peticioQR = () => {

        const inputValue : any = inputRef.current;

        if (!inputValue.value) {
            alert('Introdueix un número de taula');
            return;
        }

        console.log(inputValue.value);

        socket.emit('generateQR', restaurantId, inputValue.value);

    }

    return (
        <div>
            <p>Aquest és el contingut de la pàgina Compartir QR</p>
            <input type="text" id="taula" ref={inputRef} />
            <button onClick={peticioQR}>Generar qr</button>
        </div>
    );
}