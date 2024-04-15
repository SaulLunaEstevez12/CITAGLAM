'use client'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Head from 'next/head';
import Link from 'next/link';

interface Sucursal {
  idSucursal: number;
  nombreSucursal: string;
  direccion: string;
  diasAbierto: string;
  horarioInicio: string;
  horarioFin: string;
  idNegocio: number;
}

interface Negocio {
  idNegocio: number;
  nombeNegocio: string;
  sucursal: Sucursal[];
}

const SelectorSucursales: React.FC = () => {
  const [negocios, setNegocios] = useState<Negocio[]>([]);
  const [filtro, setFiltro] = useState<string>('');
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState<Sucursal | null>(null);
  const [expandida, setExpandida] = useState<number | null>(null);


  useEffect(() => {
    const fetchNegocios = async () => {
      const response = await fetch('http://www.citaglam1.somee.com/api/negocio');
      const data: Negocio[] = await response.json();
      setNegocios(data);
    };

    fetchNegocios();
  }, []);

  const buscarSucursales = (filtro: string): Sucursal[] => {
    return negocios
      .flatMap(negocio => negocio.sucursal)
      .filter(sucursal =>
        sucursal.nombreSucursal.toLowerCase().includes(filtro.toLowerCase()) ||
        sucursal.direccion.toLowerCase().includes(filtro.toLowerCase())
      );
  };

  const toggleExpandido = (idSucursal: number) => {
    setExpandida(expandida === idSucursal ? null : idSucursal);
  };
  

  const handleSeleccionar = (sucursal: Sucursal) => {
    setSucursalSeleccionada(sucursal);
    Cookies.set('sucursalSeleccionada', `${sucursal.idSucursal}`, { expires: 1 });
    Cookies.set('negocioSeleccionado', `${sucursal.idNegocio}`, { expires: 1 });
  };

  const sucursalesFiltradas = filtro ? buscarSucursales(filtro) : negocios.flatMap(negocio => negocio.sucursal);

  return (
    <div className="bg-[#FAEFE6] min-h-screen">
      <Head>
        <title>Selector de Sucursales</title>
      </Head>
      <div  className="p-6">
        <input
          type="text"
          style={{ backgroundColor: '#CFB5A1' }}
          className="p-2 mb-4 w-full placeholder-black"
          placeholder="Buscar Estado"
          onChange={(e) => setFiltro(e.target.value)}
        />
        <div>
        {sucursalesFiltradas.map(sucursal => (
  <div key={sucursal.idSucursal} className={`p-4 mb-4 ${expandida === sucursal.idSucursal ? 'bg-[#B89784]' : 'bg-white hover:bg-[#D0BAA4]'} rounded flex flex-col justify-between transition-all duration-300 ease-in-out`} onClick={() => toggleExpandido(sucursal.idSucursal)}>
    <div className="flex justify-between items-center">
      <p>{sucursal.nombreSucursal}</p>
      <button
        onClick={() => handleSeleccionar(sucursal)}
        className="text-sm bg-[#C7A17B] hover:bg-[#B89784] text-white p-2 rounded"
      >
        Seleccionar
      </button>
    </div>
    {expandida === sucursal.idSucursal && (
      <div className="mt-4">
        <p>Dirección: {sucursal.direccion}</p>
        <p>Días Abierto: {sucursal.diasAbierto}</p>
        <p>Horario: {`${sucursal.horarioInicio} - ${sucursal.horarioFin}`}</p>
      </div>
    )}
  </div>
))}

        </div>
      </div>
    </div>
  );
};

export default SelectorSucursales;
