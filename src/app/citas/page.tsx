'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';

interface Cita {
  idCita: number;
  fechaHora: string;
  nombreCliente: string;
  servicioscita: string;
  idEstilista: number;
  emailCliente: string;
  idUsuario: number | null;
  pagado: boolean;
  pago: { monto: number }[];
}

interface Estilista {
  idEstilista: number;
  nombreEstilista: string;
}

interface Servicio {
  idServicio: number;
  nombreServicio: string;
  coste: number;
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

  

const CitasScreen = () => {
  const idSucursal = obtenerIdSucursal();
  const [citas, setCitas] = useState<Cita[]>([]);
  const [estilistas, setEstilistas] = useState<Estilista[]>([]);
  const router = useRouter();
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [fechaActual, setFechaActual] = useState<string>(new Date().toISOString());
  const [citaAEditar, setCitaAEditar] = useState<Cita | null>(null);

  const fetchCitas = async () => {
    const res = await fetch(`http://www.citaglam1.somee.com/api/sucursal/${idSucursal}/cita`);
    const data = await res.json();
    setCitas(data);
  };

  const fetchEstilistas = async () => {
    const res = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/estilista`);
    const data = await res.json();
    setEstilistas(data);
  };

  const fetchServicios = async () => {
    const res = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/servicio`);
    const data = await res.json();
    setServicios(data);
  };

  useEffect(() => {
    fetchCitas();
    fetchEstilistas();
    fetchServicios();
  }, []);

  const idUsuarioCookie = Cookies.get('usuario') ? JSON.parse(Cookies.get('usuario')!).idUsuario : null;


  const getEstilistaNombre = (idEstilista: number) => {
    const estilista = estilistas.find(e => e.idEstilista === idEstilista);
    return estilista ? estilista.nombreEstilista : 'Desconocido';
  };

  const getCostoServicio = (servicio: string, pagos: { monto: number }[]) => {
    if (pagos.length > 0) {
      return pagos.reduce((acc, pago) => acc + pago.monto, 0);
    } else {
      const servicioInfo = servicios.find(s => s.nombreServicio === servicio);
      return servicioInfo ? servicioInfo.coste : 0;
    }
  };

  const borrarCita = async (idCita: number) => {
    try {
        const response = await fetch(`http://www.citaglam1.somee.com/api/sucursal/${idSucursal}/cita/${idCita}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new Error('No se pudo borrar la cita');
        }

        setCitas(citas.filter(cita => cita.idCita !== idCita));
        alert('Cita borrada con éxito');
    } catch (error) {
        console.error('Error al borrar la cita:', error);
        alert('Error al borrar la cita');
        alert(idCita)
    }
};


const iniciarEdicion = (cita: Cita) => {
    setCitaAEditar(cita);
  };

  

  
  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!citaAEditar) {
      console.error("No hay cita seleccionada para editar.");
      return;
    }
  
    try {
      const response = await fetch(`http://www.citaglam1.somee.com/api/sucursal/${idSucursal}/cita/${citaAEditar.idCita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...citaAEditar,
          fechaHora: new Date(citaAEditar.fechaHora).toISOString(),
        nombreCliente: citaAEditar.nombreCliente,
        telefonoCliente: citaAEditar.nombreCliente,
        emailCliente: citaAEditar.emailCliente,
        servicioscita: citaAEditar.servicioscita,
        pagado: citaAEditar.pagado,
        idEstilista: citaAEditar.idEstilista,
        idUsuario: citaAEditar.idUsuario,
        }),
      });
  
      if (!response.ok) {
        throw new Error('La actualización de la cita falló');
      }
  
      const citaActualizada = await response.json();
      setCitas(citas.map(cita => cita.idCita === citaActualizada.idCita ? citaActualizada : cita));
      
      setCitaAEditar(null);
      alert('Cita actualizada con éxito');
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
      window.location.reload(); 
      
    }
  };
  
  


  return (
    <div className='flex flex-col min-h-screen'>
      <Head>
        <title>Citas</title>
      </Head>
      <div className="bg-[#D0BAA4] h-16 flex items-center justify-between px-10 text-xl font-bold">
        Citas
        <Link href="/crearcitas" className="bg-[#D0BAA4] hover:bg-[#C7A17B] text-white font-bold py-2 px-4 rounded">
  Agregar nueva cita
</Link>
      </div>
      <div className="flex flex-grow">
        {/* Citas Existentes */}
        <div className="w-1/2 p-4 overflow-auto" style={{ backgroundColor: 'rgba(208, 186, 164, 0.3)' }}>
          <h2 className="font-bold text-lg mb-4">Citas Existentes</h2>
          {citas.filter(cita => new Date(cita.fechaHora) > new Date() && cita.idUsuario === idUsuarioCookie).map((cita) => (
            <div key={cita.idCita} className="p-4 mb-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <p>Cliente: {cita.nombreCliente}</p>
                <p>Fecha y Hora: {new Date(cita.fechaHora).toLocaleString()}</p>
                <p>Estilista: {estilistas.find(e => e.idEstilista === cita.idEstilista)?.nombreEstilista || 'Desconocido'}</p>
                <p>Costo: ${getCostoServicio(cita.servicioscita, cita.pago)}</p>
              </div>
              <div>
                <button onClick={() => iniciarEdicion(cita)} title="Editar cita">✏️</button>
                <button onClick={() => borrarCita(cita.idCita)} title="Borrar cita">🗑️</button>
              </div>
            </div>
          ))}
        </div>
  
        {/* Historial de Citas */}
        <div className="w-1/2 p-4 overflow-auto" style={{ backgroundColor: '#FAEFE6' }}>
          <h2 className="font-bold text-lg mb-4">Historial de Citas</h2>
          {citas.filter(cita => new Date(cita.fechaHora) <= new Date() && cita.idUsuario === idUsuarioCookie).map((cita) => (
            <div key={cita.idCita} className="p-4 mb-4 bg-white rounded shadow flex justify-between items-center">
              <div>
                <p>Cliente: {cita.nombreCliente}</p>
                <p>Fecha y Hora: {new Date(cita.fechaHora).toLocaleString()}</p>
                <p>Estilista: {estilistas.find(e => e.idEstilista === cita.idEstilista)?.nombreEstilista || 'Desconocido'}</p>
                <p>Costo: ${getCostoServicio(cita.servicioscita, cita.pago)}</p>
              </div>
              <button onClick={() => borrarCita(cita.idCita)} title="Borrar cita">🗑️</button>
            </div>
          ))}
        </div>
      </div>
      {/* Formulario de Edición */}
      {citaAEditar && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="bg-white p-5 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Editar Cita</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="mb-4">
                <label htmlFor="nombreCliente" className="block text-sm font-bold mb-2">Nombre del Cliente:</label>
                <input
                  type="text"
                  id="nombreCliente"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  value={citaAEditar.nombreCliente}
                  onChange={(e) => setCitaAEditar({ ...citaAEditar, nombreCliente: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="fechaHora" className="block text-sm font-bold mb-2">Fecha y Hora:</label>
                <input
                  type="datetime-local"
                  id="fechaHora"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight"
                  value={citaAEditar.fechaHora.slice(0,16)}
                  onChange={(e) => setCitaAEditar({ ...citaAEditar, fechaHora: e.target.value })}
                />
              </div>
              <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Guardar Cambios
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
  
};

export default CitasScreen;
