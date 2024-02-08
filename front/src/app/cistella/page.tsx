'use client'

import { useEffect, useState } from 'react';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { Spinner, Accordion, Stack, Button } from 'react-bootstrap';

export default function Cistella() {

    const cistella = useSelector((state: RootState) => state.restaurant.tiquetIndividual);
    const dispatch = useDispatch();

    console.log(cistella);

    const sumarQuantitat = (producte: any) => {
        return () => {
            tiquet.pivot.quantitat++;
            setMevaComanda([...mevaComanda]);
        }
    }

    const restarQuantitat = (producte: any) => {
        return () => {
            if (tiquet.pivot.quantitat > 1) {
                tiquet.pivot.quantitat--;
                setMevaComanda([...mevaComanda]);
            }
        }
    }

    return (
        <div className='w-80 mx-auto mt-4'>
            <h1 className='text-center mb-2'>Cistella</h1>
            <Accordion>
                {cistella.length === 0 ? (
                    <div className='text-center'>Cistella buida</div>
                ) : (
                    cistella.map((producte, index) => {
                        return (
                            <Stack key={index} gap={3} className='border rounded mb-1'>
                                <Accordion.Item eventKey={index.toString()} className='shadow'>
                                    <Accordion.Header className='rounded'>
                                        <div className="d-flex w-100">
                                            <div>{producte.quantitat}x</div>
                                            <div className="ms-3">{/*tiquet.nom*/}Hamburguesa clàsica</div>
                                            <div className="ms-auto me-2">{/*tiquet.preu * producte.quantitat*/}23€</div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className='p-2 pt-3 d-flex flex-column gap-2 bg-primary-subtle rounded-bottom'>
                                        <div className='d-flex flex-column gap-2'>
                                            <div className='d-flex w-auto border border-2 rounded-3'>
                                                <Button variant="secondary" onClick={restarQuantitat(producte)}> - </Button>
                                                <input type="text" value={producte.quantitat} readOnly className='text-center w-100' />
                                                <Button variant="secondary" onClick={sumarQuantitat(producte)}> + </Button>
                                            </div>
                                            <Button variant='danger' onClick={() => eliminarItem(tiquet)}>Eliminar</Button>
                                            <div>{tiquet.descripcio}</div>
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Stack>
                        )
                    })
                )}
            </Accordion>
        </div>
    )
}