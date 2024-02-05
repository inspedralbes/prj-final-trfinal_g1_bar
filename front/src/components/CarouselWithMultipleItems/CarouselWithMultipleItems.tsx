import React from 'react';
import { Carousel } from 'react-bootstrap';

const itemsPerSlide = 3;

const CarouselWithMultipleItems = ({ data }) => {
  const totalSlides = Math.ceil(data.length / itemsPerSlide);

  const slides = Array.from({ length: totalSlides }).map((_, index) => (
    <Carousel.Item key={index}>
      <div className="d-flex justify-content-around">
        {data.slice(index * itemsPerSlide, (index + 1) * itemsPerSlide).map((item, i) => (
          <div key={i} className="carousel-item">
            {/* Your item content goes here */}
            <img src={item.imageUrl} alt={item.altText} />
            <h4>{item.title}</h4>
            {/* Add additional content as needed */}
          </div>
        ))}
      </div>
    </Carousel.Item>
  ));

  return (
    <Carousel>{slides}</Carousel>
  );
};

export default CarouselWithMultipleItems;