'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import { Offcanvas, Button } from 'react-bootstrap';
import { IconLogin2 } from '@tabler/icons-react';
import { IconMenu2 } from '@tabler/icons-react';

const Header = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const offcanvas = {
        width: '75%'
    };

    return (
        <header className="p-3 flex justify-between items-center bg-zinc-300">
            <img className="rounded" src="/paypart.png" alt="" width="50px" height="50px"/>
            <h1>PayPart</h1>
            <button><IconLogin2 size={36}/></button>
            <button onClick={handleShow}><IconMenu2 size={36}/></button>
            <Offcanvas style={offcanvas} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Titol</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <nav className="nav flex-column">
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <Link href="/menu" onClick={handleClose}>
                                    MENÚ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/comanda" onClick={handleClose}>
                                    LA NOSTRA COMANDA
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/pagament" onClick={handleClose}>
                                    PAGAMENT
                                </Link>
                            </li>
                            <li className="nav-item" onClick={handleClose}>
                                <Link href="/qr">
                                    COMPARTIR QR
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/login" onClick={handleClose}>
                                    LOGIN
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/register" onClick={handleClose}>
                                    REGISTRAR
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/logout" onClick={handleClose}>
                                    TANCAR SESSIÓ
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link href="/comanda/comanda-alt" onClick={handleClose}>
                                    COMANDA ALTERNATIVA
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