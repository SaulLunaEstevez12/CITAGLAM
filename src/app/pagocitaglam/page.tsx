'use client'
import React, { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Corrección: next/router en lugar de next/navigation
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from 'react-icons/fa';
import { CgCreditCard } from 'react-icons/cg';

interface Usuario {
  nombreCliente: string;
  telefono: string;
  correo: string;
  idUsuario: number;
}

const obtenerInfoCompraRenta = () => {
  const compraRenta = Cookies.get('compracitaglam');
  if (compraRenta) {
    if (compraRenta === 'compra') {
      return { nombreServicio: 'Citaglam Compra', coste: 32000 };
    } else if (compraRenta === 'renta') {
      return { nombreServicio: 'Citaglam Renta', coste: 800 };
    }
  }
  // Retornar null si la cookie no está o tiene un valor inesperado
  return null;
};

const Payment = () => {
  const captcha = useRef<any>(null);
  const [infoServicio, setInfoServicio] = useState<{ nombreServicio: string, coste: number } | null>(null);
  const [metodoPago, setMetodoPago] = useState('');
  const [tarjetaNumero, setTarjetaNumero] = useState('');
  const [tarjetaExpiracion, setTarjetaExpiracion] = useState('');
  const [tarjetaCVC, setTarjetaCVC] = useState('');

  const router = useRouter();

  useEffect(() => {
    const info = obtenerInfoCompraRenta();
    setInfoServicio(info);
  }, []);

  const handlePagar = async () => {

    if (!captcha.current.getValue()){
        alert('Por favor, completa el captcha.');
        return;
        }

    if (metodoPago === 'Tarjeta de Crédito' && (!tarjetaNumero || !tarjetaExpiracion || !tarjetaCVC)) {
      alert('Por favor, completa los datos de la tarjeta.');
      return;
    }

    try {
      // Aquí se realizaría la lógica de pago, adaptándola según sea necesario
      alert('Pago realizado con éxito');
      router.push('/confirmacion'); // Cambiar a la ruta deseada después del pago
    } catch (error) {
      alert('Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.');
      console.error('Error al enviar la cita o el pago:', error);
    }
  };

  const onchange = (token: string | null) => {
    console.log('captcha value:', token);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sección izquierda con el servicio seleccionado y su costo */}
      <div className="w-1/5 bg-[#D0BAA4] bg-opacity-80 p-6 space-y-4">
        <h3 className="text-xl font-semibold text-gray-900">Servicio Seleccionado</h3>
        {infoServicio && (
          <div className="text-gray-700">
            <p>{infoServicio.nombreServicio} - Mex$ {infoServicio.coste}</p>
          </div>
        )}

        <button
          onClick={() => router.back()}
          className="text-sm bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
        >
          Cancelar y Regresar
        </button>
      </div>

      {/* Sección derecha para seleccionar el método de pago */}
      <div className="w-4/5 bg-[#FAEFE6] p-6 flex flex-col">
        <div className="mt-10 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Selecciona El Método De Pago</h3>
          <div className="flex justify-between mb-10">
            {/* Botones de método de pago */}
            <button
              onClick={() => setMetodoPago('Tarjeta de Crédito')}
              className={`p-4 ${metodoPago === 'Tarjeta de Crédito' ? 'text-[#B18362]' : 'text-black'}`}
            >
              <CgCreditCard size={100} />
            </button>
            <button
              onClick={() => setMetodoPago('PayPal')}
              className={`p-4 ${metodoPago === 'PayPal' ? 'text-[#B18362]' : 'text-black'}`}
            >
              <FaPaypal size={100} />
            </button>
          </div>
        </div>

        {/* Formulario de pago para tarjeta de crédito */}
        {metodoPago === 'Tarjeta de Crédito' && (
          <div className="flex flex-col space-y-6">
            <input
              type="text"
              maxLength={19}
              placeholder="Número de tarjeta"
              value={tarjetaNumero}
              onChange={(e) => setTarjetaNumero(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
              className="w-full text-2xl border-b border-gray-300 bg-transparent pb-2"
            />
            <div className="flex justify-between">
              <input
                type="text"
                maxLength={5}
                placeholder="MM/AAAA"
                value={tarjetaExpiracion}
                onChange={(e) => setTarjetaExpiracion(e.target.value)}
                className="text-xl border-b border-gray-300 bg-transparent pb-2"
              />
              <input
                type="text"
                maxLength={3}
                placeholder="CVC"
                value={tarjetaCVC}
                onChange={(e) => setTarjetaCVC(e.target.value)}
                className="text-xl border-b border-gray-300 bg-transparent pb-2"
              />
            </div>
          </div>
        )}

<div className='recaptcha'>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LeTS7YpAAAAAPOI_aJg9UPbK0WZhRj8e7Ab4DfZ"
                  onChange={onchange}
                />

              </div>

        {/* Botón de pagar */}
        <button
          onClick={handlePagar}
          disabled={metodoPago === 'Tarjeta de Crédito' && (!tarjetaNumero || !tarjetaExpiracion || !tarjetaCVC)}
          className="mt-auto bg-black text-white text-xl font-semibold py-3 px-6 rounded hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
          style={{ maxWidth: '400px' }}
        >
          Pagar
        </button>
      </div>
    </div>
  );
};

export default Payment;
