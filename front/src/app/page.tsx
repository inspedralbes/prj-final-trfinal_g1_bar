'use client'

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.modules.css'
import Carousel from 'react-bootstrap/Carousel';

export default function App() {

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  
  return (
    <div className='landing-wrapper position-relative'>
      
      <Carousel className="landing-carousel position-absolute" activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="p-5 text-center">
          <Carousel.Caption>
            <h1 className='mb-2'>PayPart</h1>
            <h2 className='h5 mb-5'>Menja sense preocupacions, paga amb facilitat</h2>
            <h3 className='h6'>Demana, menja i deixa que PayPart s'encarregui del pagament</h3>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};