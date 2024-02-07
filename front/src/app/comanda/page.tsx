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

export default function Comanda() {
    const userState = useSelector((state: RootState) => state.user);
    const tiquetId = useSelector((state: RootState) => state.restaurant.tiquetId);

    const [comanda, setComanda] = useState<any>({});
    const [mevaComanda, setMevaComanda] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {
        let id: number = 1;
        async function fetchComanda() {
            setLoading(true);
            try {
                const response = await fetch(`http://localhost:8000/api/tiquets/${id}`);
                const result = await response.json();
                console.log(result)
                if (!result.error) {
                    console.log("user  id", userState.id)
                    let mevaComanda = result.tiquets.filter((tiquet: any) => tiquet.pivot.user_id === userState.id);
                    setComanda(result);
                    setMevaComanda(mevaComanda);
                } else {
                    setComanda({ "tiquets": [] })
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchComanda();
    }, [userState])

    const sumarQuantitat = (tiquet: any) => {
        return () => {
            tiquet.pivot.quantitat++;
            setMevaComanda([...mevaComanda]);
        }
    }

    const restarQuantitat = (tiquet: any) => {
        return () => {
            if (tiquet.pivot.quantitat > 1) {
                tiquet.pivot.quantitat--;
                setMevaComanda([...mevaComanda]);
            }
        }
    }

    const guardarItem = async (tiquet: any) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tiquets/items/${tiquet.pivot.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userState.token}`,
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    tiquet_id: tiquet.pivot.tiquet_id,
                    producte_id: tiquet.pivot.producte_id,
                    quantitat: tiquet.pivot.quantitat,
                    comentari: tiquet.pivot.comentari,
                }),
            })
            const result = await response.json();
            console.log(result)
            if (!result.error) {
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const eliminarItem = async (tiquet: any) => {
        try {
            const response = await fetch(`http://localhost:8000/api/tiquets/items/${tiquet.pivot.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${userState.token}`,
                },
            })
            const result = await response.json();
            console.log(result)
            if (!result.error) {
                // Elimina from mevaComanda
                let index = mevaComanda.findIndex((item: any) => item.id === tiquet.id);
                mevaComanda.splice(index, 1);
                setMevaComanda([...mevaComanda]);
                // Elimina from comanda
                index = comanda.tiquets.findIndex((item: any) => item.id === tiquet.id);
                comanda.tiquets.splice(index, 1);
                setComanda({ ...comanda });
                setShowAlert(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const calcularPreuTotal = (items: any[]) => {
        return items.reduce((acc: number, tiquet: any) => {
            return acc + (tiquet.preu * tiquet.pivot.quantitat);
        }, 0);
    }

    return (
        <div className='m-3'>
            {loading ? (
                <div className='d-flex justify-content-center'>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            ) : (
                <div>
                    <Alert variant="success" show={showAlert} onClose={() => setShowAlert(false)} dismissible>
                        Comanda Actualitzada!
                    </Alert>
                    <Card>
                        <Card.Body>
                            <Card.Title className='text-center mb-3'>Taula {comanda.nombre_taula}</Card.Title>
                            <Tabs
                                defaultActiveKey="general"
                                id="justify-tab-example"
                                className="mb-3"
                                justify
                            >
                                <Tab eventKey="general" title="General">

                                    <Accordion flush className='rounded'>
                                        {comanda.tiquets.length === 0 ? (
                                            <div className='text-center'>No hi ha tiquets</div>
                                        ) : comanda.tiquets.map((tiquet: any, id: number) => (
                                            <Stack key={tiquet.id} gap={3} className='border rounded mb-1'>
                                                <Accordion.Item eventKey={id.toString()}>
                                                    <Accordion.Header className='rounded'>
                                                        <div className="d-flex w-100">
                                                            <div>{tiquet.pivot.quantitat}x</div>
                                                            <div className="ms-3">{tiquet.nom}</div>
                                                            <div className="ms-auto me-2">{tiquet.preu * tiquet.pivot.quantitat}€</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                                        <div className='text-center'>ESTAT: <b>{tiquet.pivot.estat}</b></div>
                                                        {tiquet.pivot.estat === 'Pendent' && tiquet.pivot.user_id === userState.id ? (
                                                            <div className='d-flex flex-column gap-2'>
                                                                <div className='d-flex w-auto border border-2 rounded-3'>
                                                                    <Button variant="secondary" onClick={restarQuantitat(tiquet)}> - </Button>
                                                                    <input type="text" value={tiquet.pivot.quantitat} readOnly className='text-center w-100' />
                                                                    <Button variant="secondary" onClick={sumarQuantitat(tiquet)}> + </Button>
                                                                </div>
                                                                <Button variant='primary' onClick={() => guardarItem(tiquet)} >Guardar</Button>
                                                                <Button variant='danger' onClick={() => eliminarItem(tiquet)}>Eliminar</Button>
                                                                <div>{tiquet.descripcio}</div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {tiquet.descripcio}
                                                            </div>
                                                        )
                                                        }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Stack>
                                        ))}
                                    </Accordion>
                                    <div className='mt-3 text-center'>Total Taula: <b>{calcularPreuTotal(comanda.tiquets)}€</b></div>
                                </Tab>
                                <Tab eventKey="individual" title="Meva Comanda">
                                    <Accordion flush className='rounded' >
                                        {mevaComanda.length === 0 ? (
                                            <div className='text-center'>No hi ha tiquets</div>
                                        ) : mevaComanda.map((tiquet: any, id: number) => (
                                            <Stack key={tiquet.id} gap={3} className='border rounded mb-1'>
                                                <Accordion.Item eventKey={id.toString()}>
                                                    <Accordion.Header className='rounded'>
                                                        <div className="d-flex w-100">
                                                            <div>{tiquet.pivot.quantitat}x</div>
                                                            <div className="ms-3">{tiquet.nom}</div>
                                                            <div className="ms-auto me-2">{tiquet.preu * tiquet.pivot.quantitat}€</div>
                                                        </div>
                                                    </Accordion.Header>
                                                    <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                                        <div className='text-center'>ESTAT: <b>{tiquet.pivot.estat}</b></div>
                                                        {tiquet.pivot.estat === 'Pendent' ? (
                                                            <div className='d-flex flex-column gap-2'>
                                                                <div className='d-flex w-auto border border-2 rounded-3'>
                                                                    <Button variant="secondary" onClick={restarQuantitat(tiquet)}> - </Button>
                                                                    <input type="text" value={tiquet.pivot.quantitat} readOnly className='text-center w-100' />
                                                                    <Button variant="secondary" onClick={sumarQuantitat(tiquet)}> + </Button>
                                                                </div>
                                                                <Button variant='primary' onClick={() => guardarItem(tiquet)} >Guardar</Button>
                                                                <Button variant='danger' onClick={() => eliminarItem(tiquet)}>Eliminar</Button>
                                                                <div>{tiquet.descripcio}</div>
                                                            </div>
                                                        ) : (
                                                            <div>
                                                                {tiquet.descripcio}
                                                            </div>
                                                        )
                                                        }
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Stack>
                                        ))}
                                    </Accordion>
                                    <div className='mt-3 text-center'>Total Personal: <b>{calcularPreuTotal(mevaComanda)}€</b></div>
                                </Tab>
                            </Tabs>
                        </Card.Body>
                    </Card>
                </div>

            )}
        </div>
    )
}
