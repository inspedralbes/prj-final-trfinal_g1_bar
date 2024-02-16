'use client'

import { useEffect, useState } from 'react';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Accordion, Stack, Button, Alert, Spinner } from 'react-bootstrap';
import { setTiquetIndividual, setTiquetTaula } from "@/lib/Features/restaurantSlice";
import { socket } from '../../sockets';

export default function Cistella() {

    let cistella = useSelector((state: RootState) => state.restaurant.tiquetIndividual);
    const userState = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const { push } = useRouter();
    const [loading, setLoading] = useState(false);

    const sumarQuantitat = (producteId: number) => {
        return () => {
            const producteIndex = cistella.findIndex((item) => item.producte_id === producteId);
            if (producteIndex !== -1) {
                const producte = { ...cistella[producteIndex] };
                producte.quantitat++;
                const newCistella = [...cistella];
                newCistella[producteIndex] = producte;
                dispatch(setTiquetIndividual(newCistella));
            }
        }
    }

    const restarQuantitat = (producteId: number) => {
        return () => {
            const producteIndex = cistella.findIndex((item) => item.producte_id === producteId);
            if (producteIndex !== -1 && cistella[producteIndex].quantitat > 1) {
                const producte = { ...cistella[producteIndex] };
                producte.quantitat--;
                const newCistella = [...cistella];
                newCistella[producteIndex] = producte;
                dispatch(setTiquetIndividual(newCistella));
            }
        }
    }

    const eliminarItem = (producteId: number) => {
        const newCistella = cistella.filter((item) => item.producte_id !== producteId);
        dispatch(setTiquetIndividual(newCistella));
    }

    const enviarCistella = async () => {

        /*const productes = cistella.map((item) => {
            return {
                tiquet_id: item.tiquet_id,
                producte_id: item.producte_id,
                quantitat: item.quantitat,
                comentari: item.comentari
            }
        });*/

        let auxCistella = [];
        
        for (let i = 0; i < cistella.length; i++) {
            let producte = { ...cistella[i] };
            producte.usuari_id = userState.id;
            producte.estat = "Pendent"
            auxCistella.push(producte);
        }

        const body = {
            tiquet_id: "1-1",
            productes: auxCistella
        }

        console.log("BODY", body);
        socket.emit('crear-comanda', body);
        dispatch(setTiquetIndividual([]));

        socket.on('crear-comanda', (cistella) => {
            console.log('socket crear-comanda', cistella);
            dispatch(setTiquetTaula(cistella));
        });

        // Set loading true per 5 segons
        // setLoading(true);

        // const body = cistella.map((item) => {
        //     return {
        //         tiquet_id: item.tiquet_id,
        //         producte_id: item.producte_id,
        //         quantitat: item.quantitat,
        //         comentari: item.comentari
        //     }
        // });

        // try {
        //     const response = await fetch(`http://localhost:8000/api/tiquets/items`, {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //             'Accept': 'application/json',
        //             'Authorization': `Bearer ${userState.token}`,
        //         },
        //         body: JSON.stringify(body)
        //     })
        //     const data = await response.json();
        //     console.log(data);
        //     dispatch(setTiquetIndividual([]));
        //     push('/comanda');
        // } catch (error) {
        //     console.log("Error: ", error);
        // } finally {
        //     setLoading(false);
        // }
    }

    return (
        <div className='w-80 mx-auto mt-4'>
            <h1 className='text-center mb-2'>Cistella</h1>
            <Accordion>
                {cistella.length === 0 ? (
                    <Alert variant={"info"} className='text-center mt-3'>
                        <div className='d-flex flex-column gap-3'>
                            <div>La cistella està buida</div>
                            <Button onClick={() => push('/menu')}>Menú</Button>
                        </div>
                    </Alert>
                ) : (
                    <div>
                        {cistella.map((producte, index) => {
                            return (
                                <Stack key={index} gap={3} className='border rounded mb-1'>
                                    <Accordion.Item eventKey={index.toString()} className='shadow'>
                                        <Accordion.Header className='rounded'>
                                            <div className="d-flex w-100">
                                                <div>{producte.quantitat}x</div>
                                                <div className="ms-3">{producte.nom}</div>
                                                <div className="ms-auto me-2">{producte.preu * producte.quantitat}€</div>
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                            <div className='d-flex flex-column gap-2'>
                                                <div className='d-flex w-auto border border-2 rounded-3'>
                                                    <Button variant="secondary" onClick={restarQuantitat(producte.producte_id)} disabled={loading}> - </Button>
                                                    <input type="text" value={producte.quantitat} readOnly className='text-center w-100' />
                                                    <Button variant="secondary" onClick={sumarQuantitat(producte.producte_id)} disabled={loading}> + </Button>
                                                </div>
                                                <Button variant='danger' onClick={() => eliminarItem(producte.producte_id)} disabled={loading}>Eliminar</Button>
                                                <div>{producte.descripcio}</div>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Stack>
                            )
                        })}
                        <div className='d-flex justify-content-center'>
                            <Button onClick={enviarCistella} className='mt-3 w-50' variant='success' disabled={loading}>
                                {loading ? <Spinner animation="border" role="status" /> : "Enviar cistella"}
                            </Button>
                        </div>
                    </div>
                )}
            </Accordion>
        </div>
    )
}