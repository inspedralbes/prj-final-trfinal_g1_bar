'use client'

import { useEffect, useState } from 'react';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Spinner from 'react-bootstrap/Spinner';
import Stack from 'react-bootstrap/Stack';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';
import GlobalConfig from '../app.config'
import { useRouter } from 'next/navigation';
import { setTiquetTaula } from "@/lib/Features/restaurantSlice";
import { socket } from '../../sockets';

export default function Comanda() {

    const dispatch = useDispatch();
    const { push } = useRouter();
    const userState = useSelector((state: RootState) => state.user);

    const [arrayUsuaris, setArrayUsuaris] = useState([]);
    const comandaTaula = useSelector((state: RootState) => state.restaurant.tiquetTaula);
    let comandaIndividual: any = [];

    for (let i = 0; i < comandaTaula.length; i++) {
        if (comandaTaula[i].usuari_id === userState.id) {
            comandaIndividual.push(comandaTaula[i]);
        }
    }

    const [isLoadingGuardar, setLoadingGuardar] = useState(false);
    const [isLoadingEliminar, setLoadingEliminar] = useState(false);
    const [showAlert, setShowAlert] = useState(false)


    const [productesModificats, setproductesModificats] = useState(comandaTaula);

    useEffect(() => {
        setproductesModificats(comandaTaula);
    }, [comandaTaula]);


    const sumarQuantitat = (producte: any) => {
        return () => {
            const updatedComandaTaula = productesModificats.map((item: any) => {
                if (item.id === producte.id) {
                    return { ...item, quantitat: item.quantitat + 1 };
                }
                return item;
            });
            setproductesModificats(updatedComandaTaula);
        }
    }

    const restarQuantitat = (producte: any) => {
        return () => {
            if (producte.quantitat > 1) {
                const updatedComandaTaula = productesModificats.map((item: any) => {
                    if (item.id === producte.id) {
                        return { ...item, quantitat: item.quantitat - 1 };
                    }
                    return item;
                });
                setproductesModificats(updatedComandaTaula);
            }
        }
    }

    const guardarItem = async (producte: any) => {

        socket.emit('modificar-producte', "1-1", producte); // (nom-socket, tiquet_id, producte)
        socket.on('modificar-producte', (cistella) => {
            console.log('socket modificar-producte', cistella);
            dispatch(setTiquetTaula(cistella));
        });
    }

    const eliminarItem = async (producte: any) => {

        socket.emit('eliminar-producte', "1-1", producte.id); // (nom-socket, tiquet_id, producte_id)
        
        socket.on('eliminar-producte', (cistella) => {
            console.log('socket eliminar-producte', cistella);
            dispatch(setTiquetTaula(cistella));
        });
    }

    const calcularPreuTotalTiquetTaula = (items: any[]) => {
        return items.reduce((acc: number, producte: any) => {
            return acc + (producte.preu * producte.quantitat);
        }, 0);
    }

    const calcularPreuTotalTiquetIndividual = (items: any[]) => {
        
        let calcularPreuTotalTiquetIndividual = 0;

        for (let i = 0; i < items.length; i++) {
            if (items[i].usuari_id === userState.id) {
                calcularPreuTotalTiquetIndividual =+ (items[i].preu * items[i].quantitat);
            }
        }

        return calcularPreuTotalTiquetIndividual;
    }

    return (
        <div className='m-3'>
            <div>
                <Card className='shadow'>
                    <Card.Body>
                        <Card.Title className='text-center mb-3 fs-2'>Taula</Card.Title>
                        <Tabs
                            defaultActiveKey="general"
                            id="justify-tab-example"
                            className="mb-3"
                            justify
                        >
                            <Tab eventKey="general" title="General">

                                <Accordion>
                                    {productesModificats.length === 0 ? (
                                        <div className='text-center'>No hi ha tiquets</div>
                                    ) : productesModificats.map((producte: any, id: number) => (
                                        <Stack key={producte.id} gap={3} className='border rounded mb-1'>
                                            <Accordion.Item eventKey={id.toString()} className='shadow'>
                                                <Accordion.Header className='rounded'>
                                                    <div className="d-flex w-100">
                                                        <div>{producte.quantitat}x</div>
                                                        <div className="ms-3">{producte.nom}</div>
                                                        <div className="ms-auto me-2">{producte.preu * producte.quantitat}€</div>
                                                    </div>
                                                </Accordion.Header>
                                                <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                                    <div className='text-center'>ESTAT: <b>{producte.estat}</b></div>
                                                    {producte.estat === 'Pendent' && producte.usuari_id === userState.id ? (
                                                        <div className='d-flex flex-column gap-2'>
                                                            <div className='d-flex w-auto border border-2 rounded-3'>
                                                                <Button variant="secondary" onClick={restarQuantitat(producte)}> - </Button>
                                                                <input type="text" value={producte.quantitat} readOnly className='text-center w-100' />
                                                                <Button variant="secondary" onClick={sumarQuantitat(producte)}> + </Button>
                                                            </div>
                                                            <Button variant='primary' onClick={() => guardarItem(producte)} disabled={isLoadingGuardar}>Guardar</Button>
                                                            <Button variant='danger' onClick={() => eliminarItem(producte)} disabled={isLoadingEliminar}>Eliminar</Button>
                                                            <div>{producte.descripcio}</div>
                                                        </div>
                                                    ) : (
                                                        <div>
                                                            {producte.descripcio}
                                                        </div>
                                                    )
                                                    }
                                                </Accordion.Body>
                                            </Accordion.Item>
                                        </Stack>
                                    ))}
                                </Accordion>
                                <div className='mt-3 text-center'>Total Taula: <b className='fs-3'>{calcularPreuTotalTiquetTaula(productesModificats)}€</b></div>
                            </Tab>
                            <Tab eventKey="individual" title="Meva Comanda">
                                <Accordion flush className='rounded' >
                                    {comandaIndividual.length === 0 ? (
                                        <div className='text-center'>No hi ha tiquets</div>
                                    ) : productesModificats.map((producte: any, id: number) => (
                                        userState.id === producte.usuari_id && (
                                            <Stack key={producte.id} gap={3} className='border rounded mb-1'>
                                                <Accordion.Item eventKey={id.toString()} className='shadow'>
                                                    <Accordion.Header className='rounded'>
                                                        <div className="d-flex w-100">
                                                            <div>{producte.quantitat}x</div>
                                                            <div className="ms-3">{producte.nom}</div>
                                                            <div className="ms-auto me-2">{producte.preu * producte.quantitat}€</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                                        <div className='text-center'>ESTAT: <b>{producte.estat}</b></div>
                                                        {producte.estat === 'Pendent' ? (
                                                            <div className='d-flex flex-column gap-2'>
                                                                <div className='d-flex w-auto border border-2 rounded-3'>
                                                                    <Button variant="secondary" onClick={restarQuantitat(producte)}> - </Button>
                                                                    <input type="text" value={producte.quantitat} readOnly className='text-center w-100' />
                                                                    <Button variant="secondary" onClick={sumarQuantitat(producte)}> + </Button>
                                                                </div>
                                                                <Button variant='primary' onClick={() => guardarItem(producte)} disabled={isLoadingGuardar}>Guardar</Button>
                                                                <Button variant='danger' onClick={() => eliminarItem(producte)} disabled={isLoadingEliminar}>Eliminar</Button>
                                                                <div>{producte.descripcio}</div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {producte.descripcio}
                                                            </div>
                                                        )
                                                        }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Stack>
                                        )))}
                                </Accordion>
                                <div className='mt-3 text-center'>Total Personal: <b className='fs-3'>{calcularPreuTotalTiquetIndividual(productesModificats)}€</b></div>
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
                <div className='mt-3 d-flex justify-content-center'>
                    <Button variant='success' className='w-60 shadow' onClick={() => push('/pagament')}>Pagar</Button>
                </div>
            </div>
        </div>
    )
}