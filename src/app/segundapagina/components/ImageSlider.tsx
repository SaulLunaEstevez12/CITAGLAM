'use client'
import React, { useState } from 'react';
import '../styles/ImageSlider.module.css'; // Asegúrate de que la ruta es correcta

// Tipos para las propiedades del componente, ajusta según tus necesidades
type ImageSliderProps = {
  images: string[]; // Suponiendo que 'images' es un array de URLs de las imágenes
};

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = currentImageIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentImageIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
  };

  return (
    <div className="slider">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Slide ${index}`}
          style={{ display: index === currentImageIndex ? 'block' : 'none' }}
        />
      ))}
      <button className="slider-button left" onClick={goToPrevious}>
        &#9664; {/* Unicode left arrow */}
      </button>
      <button className="slider-button right" onClick={goToNext}>
        &#9654; {/* Unicode right arrow */}
      </button>
      <div className="slider-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            className={`slider-indicator ${index === currentImageIndex ? 'active' : ''}`}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
