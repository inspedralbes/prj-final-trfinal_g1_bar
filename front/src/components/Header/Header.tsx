'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Offcanvas, Button } from 'react-bootstrap';
//import { IconLogin2 } from '@tabler/icons-react';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const offcanvas = {
        width: '75%'
    };

    return (
        <header className="p-3 flex justify-between items-center bg-zinc-300">
            <img class="rounded" src="/paypart.png" alt="" width="50px" height="50px"/>
            <h1>PayPart</h1>
            <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg></button>
            <Button onClick={handleShow}>
                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-menu-2" width="36" height="36" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>
            </Button>
            <Offcanvas style={offcanvas} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Titol</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <nav class="nav flex-column">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <Link href="/menu" onClick={handleClose}>
                                    MENÚ
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/comanda" onClick={handleClose}>
                                    LA NOSTRA COMANDA
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/pagament" onClick={handleClose}>
                                    PAGAMENT
                                </Link>
                            </li>
                            <li class="nav-item" onClick={handleClose}>
                                <Link href="/qr">
                                    COMPARTIR QR
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link href="/menu" onClick={handleClose}>
                                    TANCAR SESSIÓ
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </Offcanvas.Body>
            </Offcanvas>
        </header>

    );
};

export default Header;