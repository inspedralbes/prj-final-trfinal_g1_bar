'use client'

import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { RootState } from '@/lib/store';
import { useRouter } from 'next/navigation';

export default function QR() {
    const { push } = useRouter();
    const codiQr = useSelector((state: RootState) => state.restaurant.codiQr);

    return (
        <div className='w-80 mx-auto mt-4'>
            <Alert variant="info">
                Comparteix aquest codi QR amb els teus amics per a que puguin unir-se a la taula.
            </Alert>
            <div className='d-flex justify-content-center'>
                <img src={codiQr} alt="codi-qr" height="400px" width="400px"/>
            </div>
            <div className='d-flex justify-content-center'>
                <Button className='w-60' onClick={() => push('/menu')}>Menú</Button>
            </div>
        </div>
    )
}