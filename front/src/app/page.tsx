'use client'

import React, { useState, useEffect, useRef } from 'react';
import { RootState } from '@/lib/store';
import { useSelector, useDispatch } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.modules.css'
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { setTiquetId, setRestaurantId } from '@/lib/Features/restaurantSlice';

export default function App() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams()

  let restaurantId: any = null;
  let tableId: any = null;

  if(searchParams) {
    restaurantId = searchParams.get('restaurantId');
    tableId = searchParams.get('tableId');
  }

  const [index, setIndex] = useState(0);
  const userToken = useSelector((state: RootState) => state.user.token);

  const handleSelect = (selectedIndex: any) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (restaurantId && tableId) {      
      // Guardar a la store
      dispatch(setRestaurantId(parseInt(restaurantId)));
      dispatch(setTiquetId(parseInt(tableId)));

      // Guardar a localStorage
      localStorage.setItem('userInfo', JSON.stringify({ restaurantId, tableId }));

      // Unir-se a la sala
      // socket.emit('joinRoom', `${restaurantId}-${tableId}`)
    }
  }, [restaurantId, tableId]);

  return (
    <div className='landing-wrapper'>
      <img className='landing-background' src="/landing-background.jpg" alt="" />
      <div className='landing-titles rounded mx-5 px-3 py-4'>
        <h1 className='h3 my-4'>PayPart</h1>
        <h2 className='h6 mb-4'>Menja sense preocupacions, paga amb facilitat</h2>
      </div>
      <Carousel className="landing-carousel" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="p-5 text-center">
          <h3 className='h6 mt-5 mb-4'>Demana, menja i deixa que PayPart s'encarregui del pagament</h3>
          {!userToken ? (<div className='d-flex justify-content-center gap-3 my-3'>
            <Link href="/register" className='link-underline link-underline-opacity-0 text-black'>
              <button className='p-3 bg-zinc-300 rounded'>REGISTRA'T</button>
            </Link>
            <Link href="/login" className='link-underline link-underline-opacity-0 text-black'>
              <button className='p-3 bg-zinc-300 rounded'>INICIA SESSIÓ</button>
            </Link>
          </div>)
            : (<Link href="/menu" className='link-underline link-underline-opacity-0 text-black'>
              <button className='w-100 p-3 bg-zinc-300 rounded'>MENÚ</button></Link>)}
        </Carousel.Item>
        <Carousel.Item className="p-5 text-center">
          <h3 className='h6 mt-5 mb-4'>Centenars d'establiments utilitzen PayPart</h3>
          <Link href="/" className='link-underline link-underline-opacity-0 text-black'>
            <button className='p-3 bg-zinc-300 rounded'>TROBA ELS ESTABLIMENTS MÉS PROPERS</button>
          </Link>
        </Carousel.Item>
        <Carousel.Item className="p-5 text-center">
          <h3 className='h6 mt-5 mb-4'>Ets el propietari d'un establiment i vols implementar PayPart?</h3>
          <Link href="/" className='link-underline link-underline-opacity-0 text-black'>
            <button className='w-100 p-3 bg-zinc-300 rounded'>
              FER-SE COMPTE D'ADMINISTRADOR
            </button>
          </Link>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};