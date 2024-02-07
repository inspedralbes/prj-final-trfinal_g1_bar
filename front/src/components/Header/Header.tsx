'use client'
import React, { useState, useEffect } from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { IconMenu2 } from '@tabler/icons-react';
import Link from 'next/link';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "@/lib/Features/userSlice";
import Stack from 'react-bootstrap/Stack';

const Header = () => {
    const [show, setShow] = useState(false);
    const userToken = useSelector((state: RootState) => state.user.token);
    const dispatch = useDispatch();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const offcanvas = {
        width: '75%'
    };

    useEffect(() => {
        // Si existeix una sessió d'usuari, guardar a la store
        const userSession = localStorage.getItem('user');
        if (userSession) {
            console.log("userSession: ", JSON.parse(userSession));
            dispatch(login(JSON.parse(userSession)));
        }
    }, [])

    return (
        <header className="p-3 flex justify-between items-center bg-zinc-300">
            <Link href="/">
                <img className="rounded" src="/paypart.png" alt="" width="50px" height="50px" />
            </Link>
            <h1>PayPart</h1>
            {!userToken ? (
                <Button variant="primary" className='link-underline  link-underline-opacity-0'>
                    <Link href="/login" className='link-underline  link-underline-opacity-0 text-white'>
                        Login
                    </Link>
                </Button>
            ) : (
                <div className='d-flex'>
                    <button onClick={handleShow}><IconMenu2 size={42} /></button>
                    <Offcanvas style={offcanvas} show={show} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>PayPart</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Stack gap={3}>
                                <div>
                                    <Link href="/menu" onClick={handleClose} className='link-underline  link-underline-opacity-0'>
                                        Menú
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/qr" onClick={handleClose} className='link-underline  link-underline-opacity-0'>
                                        Compartir QR
                                    </Link>
                                </div>
                                <div>
                                    <Link href="/comanda" onClick={handleClose} className='link-underline  link-underline-opacity-0'>
                                        Comanda
                                    </Link>
                                </div>
                                <Button variant="success" className='link-underline  link-underline-opacity-0 mt-2'>
                                    <Link href="/pagament" onClick={handleClose} className='link-underline  link-underline-opacity-0 text-white'>Pagament</Link>
                                </Button>
                                <Button variant="secondary" className='link-underline  link-underline-opacity-0 mt-2'>
                                    <Link href="/logout" onClick={handleClose} className='link-underline  link-underline-opacity-0 text-white'>Tancar Sessió</Link>
                                </Button>
                            </Stack>
                        </Offcanvas.Body>
                    </Offcanvas>
                </div>
            )}

        </header>

    );
};

export default Header;