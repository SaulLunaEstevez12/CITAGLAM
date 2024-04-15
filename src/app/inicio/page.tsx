"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import flechaDerecha from "/public/flecha-correcta (2).png";
import flechaIzquierda from "/public/flecha-izquierda.png";
import Image from "next/image";
import Cookies from "js-cookie";

const images = [
  '/slider1.jpeg',
  '/slider2.jpg',
  '/slider3.jpg',
  '/slider4.jpg',
];

const texto = [
  "¡CONOCENÓS! ",
  "-MAQUILLAJE-",
  "-PEINADO-",
  "-CUIDADO FÁCIAL-",
];

export default function PageInicio() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isSucursalSelected, setIsSucursalSelected] = useState(false);

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

    useEffect(() => {
        const interval = setInterval(goToNext, 2000); // Cambia la imagen cada 2 segundos
        checkSucursalSelected();
    
        return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta o actualiza
    }, [currentImageIndex]);

    useEffect(() => {
        checkSucursalSelected();
    }, []);

    const checkSucursalSelected = () => {
        const sucursal = Cookies.get('sucursalSeleccionada');
        setIsSucursalSelected(!!sucursal);
    };

    return (
      <div className="w-screen h-screen bg-black">
        <nav
          id="NAVBAR"
          className="h-20 w-full z-50 flex flex-row justify-evenly font-serif text-3xl font-extrabold text-white fixed top-0 items-center"
          style={{ zIndex: 1000 }}
        >
          <Link href={"/iniciosucursal"}>Inicio</Link>
          <Link href={"/seleccion"}>Elige Tu Sucursal</Link>
          <Link href={"/servicios"} className={`${!isSucursalSelected ? "pointer-events-none opacity-50" : ""}`}>Servicios</Link>
          <Link href={"/crearcitas"} className={`${!isSucursalSelected ? "pointer-events-none opacity-50" : ""}`}>Citas</Link>
        </nav>
        <div id="CUERPO" className="w-screen h-screen flex pt-20">
          <div className="w-full h-full flex relative">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Slide ${index}`}
                className="h-screen w-screen object-cover"
                style={{ display: index === currentImageIndex ? "block" : "none" }}
              />
            ))}
            <button
              className="absolute top-1/2 w-fit flex bg-transparent left-0 z-20"
              onClick={goToPrevious}
            >
              <Image src={flechaIzquierda} alt="flechaizquierda" width={40} height={40}></Image>
            </button>
            <button
              className="absolute top-1/2 w-fit flex bg-transparent right-0 z-20"
              onClick={goToNext}
            >
              <Image src={flechaDerecha} alt="flechaderecha" width={40} height={40}></Image>
            </button>
            <div className="slider-indicators">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={`slider-indicator ${index === currentImageIndex ? "active" : ""}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
            <div className="fixed inset-0 flex justify-center items-center z-10">
              <p className="text-8xl font-serif text-white">{texto[currentImageIndex]}</p>
            </div>
          </div>
        </div>
      </div>
    );
}
