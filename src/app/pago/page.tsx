'use client'
import React, {  useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import ReCAPTCHA from 'react-google-recaptcha';
import { FaCcVisa, FaCcMastercard, FaCcAmex, FaPaypal } from 'react-icons/fa';
import { CgCreditCard } from 'react-icons/cg';

interface Cita {
  fechaHora: string;
  nombreCliente: string;
  servicioscita: string[];
  idEstilista: string;
}

interface Servicio {
  idServicio: number;
  nombreServicio: string;
  coste: number;
  idSucursal: number;
  tiempomin: number;
}

interface Usuario{
  nombreCliente: string;
  telefono: string;
  correo: string;
  idUsuario: number;
}

const obtenerIdSucursal = () => {
  const sucursalCookie = Cookies.get('sucursalSeleccionada');
  if (sucursalCookie) {
    return sucursalCookie;
  } else {
    console.log('No se encontró la cookie con el ID de la sucursal');
    return null;
  }
};

const Payment = () => {
  const captcha = useRef<any>(null);
  const idSucursal = obtenerIdSucursal();
  const [citasListadas, setCitasListadas] = useState<Cita[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [metodoPago, setMetodoPago] = useState('');
  const [totalCoste, setTotalCoste] = useState(0);
  const [tarjetaNumero, setTarjetaNumero] = useState('');
  const [tarjetaExpiracion, setTarjetaExpiracion] = useState('');
  const [tarjetaCVC, setTarjetaCVC] = useState('');
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const router = useRouter();

  useEffect(() => {
    const cargarServicios = async () => {
      try {
        const response = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/servicio`);
        const serviciosData: Servicio[] = await response.json();
        setServicios(serviciosData);
      } catch (error) {
        console.error('Hubo un problema al recuperar los datos de los servicios:', error);
      }
    };

    cargarServicios();

    const primeracitaData = localStorage.getItem('primeracita');
    const primeracita = primeracitaData ? JSON.parse(primeracitaData) : null;

    const datosCitasData = localStorage.getItem('datosCitas');
    const datosCitas = datosCitasData ? JSON.parse(datosCitasData) : [];

    const todasLasCitas = primeracita ? [primeracita, ...datosCitas] : datosCitas;

    const citasCorregidas = todasLasCitas.map((cita: Cita) => ({
      ...cita,
      servicioscita: Array.isArray(cita.servicioscita) ? cita.servicioscita : [cita.servicioscita]
    }));
    

    setCitasListadas(citasCorregidas);
  }, []);

  useEffect(() => {
    let total = 0;
    citasListadas.forEach(cita => {
      cita.servicioscita.forEach(nombreServicio => {
        const servicioEncontrado = servicios.find(servicio => servicio.nombreServicio.trim().toLowerCase() === nombreServicio.trim().toLowerCase());
        if (servicioEncontrado) {
          total += servicioEncontrado.coste;
        }
      });
    });
    setTotalCoste(total);
  }, [citasListadas, servicios]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    };
    return new Intl.DateTimeFormat('es-MX', options).format(new Date(dateString));
  };

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
      for (const cita of citasListadas) {
        const idUsuario = obtenerIdUsuarioDeCookies() || null;
        const cuerpoCita = {
          fechaHora: cita.fechaHora,
          nombreCliente: cita.nombreCliente,
          telefonoCliente: "Un teléfono",
          emailCliente: "Un email",
          servicioscita: cita.servicioscita.join(', '),
          pagado: true,
          idEstilista: parseInt(cita.idEstilista, 10),
          idUsuario: idUsuario,
        };

        const respuestaCita = await fetch(`http://www.citaglam1.somee.com/api/sucursal/${idSucursal}/cita`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cuerpoCita),
        });

        if (!respuestaCita.ok) {
          throw new Error('Error al crear la cita');
        }
        const datosCita = await respuestaCita.json();

        await enviarPago(totalCoste, datosCita.idCita);
      }

      alert('Pago realizado con éxito');
      router.push('/citas');
    } catch (error) {
      alert('Hubo un problema al procesar tu pago. Por favor, intenta nuevamente.');
      console.error('Error al enviar la cita o el pago:', error);
      }
      };
      
      const enviarPago = async (monto: number, idCita: number) => {
      const cuerpoPago = {
        monto: monto,
        fechaHora: new Date().toISOString(),
        idCita: idCita,
      };
      try {
        const respuesta = await fetch(`http://www.citaglam1.somee.com/api/sucursal/${idSucursal}/pago`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cuerpoPago),
        });
      
        if (!respuesta.ok) {
          throw new Error('Error al registrar el pago');
        }
      
      } catch (error) {
        console.error('Error al enviar el pago:', error);
        throw error;
      }
    };

    const obtenerIdUsuarioDeCookies = () => {
      const usuarioData = Cookies.get('usuario');
      
      if (usuarioData) {
        const usuario = JSON.parse(usuarioData);
        
        return usuario.idUsuario || null;
      }
      
      return null;
    };

    const onchange = (token: string | null) => {
      console.log('captcha value:', token);
    };
        

    return (
      <div className="min-h-screen flex">
        {/* Sección izquierda con servicios ofrecidos y datos del cliente */}
        <div className="w-1/5 bg-[#D0BAA4] bg-opacity-80 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-gray-900">Servicios Ofrecidos</h3>
          <div className="space-y-1">
            {citasListadas.map((cita, index) => (
              <div key={index} className="text-gray-700">
                {cita.servicioscita.map((servicio, sIndex) => (
                  <p key={sIndex}>{servicio} - Mex$ {
                    servicios.find(s => s.nombreServicio.trim().toLowerCase() === servicio.trim().toLowerCase())?.coste ?? 'Precio no disponible'
                  }</p>
                ))}
              </div>
            ))}
          </div>
          <div className="text-xl font-bold">Total: Mex$ {totalCoste}</div>
    
          {/* Datos del cliente */}
          {citasListadas.length > 0 && (
            <>
              <h3 className="text-lg leading-6 font-medium text-gray-900 mt-5">Datos</h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">{citasListadas[0].nombreCliente}</p>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">Fecha y Hora: {formatDate(citasListadas[0].fechaHora)}</p>
            </>
          )}
    
          <button
            onClick={() => router.back()}
            className="text-sm bg-gray-300 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
          >
            Cancelar y Regresar
          </button>
        </div>
    
        {/* Sección derecha */}
    <div className="w-4/5 bg-[#FAEFE6] p-6 flex flex-col">
      <div className="mt-10 mb-8"> 
        <h3 className="text-2xl font-semibold mb-6">Selecciona El Método De Pago</h3>
        <div className="flex justify-between mb-10"> 
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

      {metodoPago === 'Tarjeta de Crédito' && (
        <div className="flex flex-col space-y-6">
          <div className="relative">
            <input
              type="text"
              maxLength={19}
              placeholder="Número de tarjeta"
              value={tarjetaNumero}
              onChange={(e) => setTarjetaNumero(e.target.value.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim())}
              className="w-full text-2xl border-b border-gray-300 bg-transparent pb-2"
            />
            <div className="absolute right-0 top-0 text-gray-400"> 
              <FaCcVisa size={32} />
            </div>
          </div>

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

