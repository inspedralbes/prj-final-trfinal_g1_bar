'use client'
import React, { useState, useEffect, use } from 'react';
import { Offcanvas, Button, Badge } from 'react-bootstrap';
import { IconMenu2 } from '@tabler/icons-react';
import { IconShoppingCart } from '@tabler/icons-react';
import Link from 'next/link';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "@/lib/Features/userSlice";
import { setRestaurantId, setTiquetId } from '@/lib/Features/restaurantSlice';
import Stack from 'react-bootstrap/Stack';
import { useRouter, usePathname } from 'next/navigation';

const Header = () => {
    const [show, setShow] = useState(false);
    const userToken = useSelector((state: RootState) => state.user.token);
    const cistella = useSelector((state: RootState) => state.restaurant.tiquetIndividual);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const pathname = usePathname()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const tancarSessio = () => {
        handleClose();
        push('/logout');
    }

    const pagament = () => {
        handleClose();
        push('/pagament');
    }

    const offcanvas = {
        width: '75%'
    };

    useEffect(() => {

        // Si existeix una sessió d'usuari, guardar a la store
        const userSession = localStorage.getItem('user');
        console.log(pathname)
        if (userSession) {
            console.log("userSession: ", JSON.parse(userSession));
            dispatch(login(JSON.parse(userSession)));
        }

        // Si existeixen dades d'usuari a localStorage, guardar a la store
        const { restaurantId, tableId } = JSON.parse(localStorage.getItem('userInfo') || '{}');
        if (restaurantId && tableId) {
            dispatch(setRestaurantId(restaurantId));
            dispatch(setTiquetId(tableId));
        }
    }, [])

    useEffect(() => {
        // Si no hi ha token d'usuari, redirigir a login
        if (!userToken && pathname !== '/login' && pathname !== '/register' && pathname !== '/') {
            push('/login');
        }
    }, [userToken])

    useEffect(() => {
        // Si el id del restaurant i taula no estan guardats, redirigir a la pàgina principal
        const { restaurantId, tableId } = JSON.parse(localStorage.getItem('userInfo') || '{}');
        
        if (userToken && (!restaurantId || !tableId)) {
            //push('/');
        }
    })

    return (
        <header className="header p-3 flex justify-between items-center bg-zinc-300 shadow-sm">
            <div className='d-flex align-items-center gap-3'>
                <Link href="/">
                    <img className="rounded" src="/paypart.png" alt="" width="50px" height="50px" />
                </Link>
                <h1 className='m-0'>PayPart</h1>
            </div>
            {!userToken ? (
                <Button variant="primary" className='link-underline  link-underline-opacity-0'>
                    <Link href="/login" className='link-underline  link-underline-opacity-0 text-white'>
                        Login
                    </Link>
                </Button>
            ) : (
                <div className='d-flex'>
                    <div className='d-flex align-items-center gap-3'>
                        <div className='position-relative'>
                            <button onClick={() => push('/cistella')}><IconShoppingCart size={42} /></button>
                            {cistella.length > 0 && <Badge bg="danger" pill style={{ position: 'absolute', top: '-3px', right: '-5px' }}>{cistella.length}</Badge>}
                        </div>
                        <button onClick={handleShow}><IconMenu2 size={42} /></button>
                    </div>
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
                                <Button variant='success' onClick={pagament}>
                                    Pagament
                                </Button>
                                <Button variant='secondary' onClick={tancarSessio}>
                                    Tancar Sessió
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