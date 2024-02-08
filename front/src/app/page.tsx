import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './landing.modules.css'

export default function App() {
  return (
    <div className='landing-wrapper position-relative'>
      <div className='landing-background position-absolute'>
        <img src="/landing-background.jpg" alt="" />
      </div>
      <div className='landing-info position-absolute p-5 text-center'>
        <h1 className='mb-2'>PayPart</h1>
        <h2 className='h5 mb-5'>Menja sense preocupacions, paga amb facilitat</h2>
        <h3 className='h6'>Demana, menja i deixa que PayPart s'encarregui del pagament</h3>
      </div>
    </div>
  );
};