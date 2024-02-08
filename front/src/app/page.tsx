'use client'

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.modules.css'
import Carousel from 'react-bootstrap/Carousel';
import Link from 'next/link';

export default function App() {

  const [index, setIndex] = useState(0);
  const userToken = useSelector((state: RootState) => state.user.token);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

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
          <div>
            {!userToken ? (<div className='d-flex justify-content-center gap-3 my-3'>
              <button className='p-3 bg-zinc-300 rounded'>
                <Link href="/register" className='link-underline link-underline-opacity-0 text-black'>REGISTRA'T</Link>
              </button>
              <button className='p-3 bg-zinc-300 rounded'>
                <Link href="/login" className='link-underline link-underline-opacity-0 text-black'>INICIA SESSIÓ</Link>
              </button>
            </div>)
              : (<button className='w-100 p-3 bg-zinc-300 rounded'>
                <Link href="/categories" className='link-underline link-underline-opacity-0 text-black'>MENÚ</Link>
              </button>)}
          </div>
        </Carousel.Item>
        <Carousel.Item className="p-5 text-center">
          <h3 className='h6 mt-5 mb-4'>Centenars d'establiments utilitzen PayPart</h3>
          <button className='p-3 bg-zinc-300 rounded'>
            <Link href="/categories" className='link-underline link-underline-opacity-0 text-black'>TROBA ELS ESTABLIMENTS MÉS PROPERS</Link>
          </button>
        </Carousel.Item>
        <Carousel.Item className="p-5 text-center">
          <h3 className='h6 mt-5 mb-4'>Ets el propietari d'un establiment i vols implementar PayPart?</h3>
          <button className='w-100 p-3 bg-zinc-300 rounded'>
            <Link href="/categories" className='link-underline link-underline-opacity-0 text-black'>FER-SE COMPTE D'ADMINISTRADOR</Link>
          </button>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};