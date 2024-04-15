'use client'
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Head from 'next/head';

interface Usuario{
    nombreCliente: string;
    telefono: string;
    correo: string;
}

interface Servicio {
    idServicio: number;
    nombreServicio: string;
    coste: number;
    tiempomin: number;
  }

  interface Estilista {
    idEstilista: number;
    nombreEstilista: string;
    telefono: string;
    sexo: string;
    horarioEntrada: string;
    horarioSalida: string;
    imagenUrl: string;
    serviciosestilista: string;
  }
  interface Sucursal {
    idSucursal: number;
    nombreSucursal: string;
    direccion: string;
    telefono: string;
    diasAbierto: string;
    correo: string;
    horarioInicio: string;
    horarioFin: string;
  }

  interface Cita {
    idCita: number;
    fechaHora: string;
    nombreCliente: string;
    telefonoCliente: string;
    emailCliente: string;
    servicioscita: string;
    pagado: boolean;
    idEstilista: number;
  }

  interface PrimeraCita {
    servicioSeleccionado: string;
    estilistaSeleccionado: string;
    fecha: string;
    hora: string;
  }

  interface CitaProgramada {
  servicioSeleccionado: string;
  estilistaSeleccionado: string;
  fecha: string;
  hora: string | null;
  tiempoInicio: Date | null;
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

  const obtenerIdNegocio = () => {
    const negocioCookie = Cookies.get('negocioSeleccionado');
    if (negocioCookie) {
      return negocioCookie;
    } else {
      console.log('No se encontró la cookie con el ID de la sucursal');
      return null;
    }
  };
  

const AgendarCitas = () => {
  const idSucursal = obtenerIdSucursal();
  const idNegocio = obtenerIdNegocio();
  const [nombre, setNombre] = useState('');
  const [citasProgramadas, setCitasProgramadas] = useState<CitaProgramada[]>([]);
  const [primeraCita, setPrimeraCita] = useState<PrimeraCita[]>([]);
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [estilistas, setEstilistas] = useState<Estilista[]>([]);
  const [servicios, setServicios] = useState<Servicio[]>([]);
  const [estilistasFiltrados, setEstilistasFiltrados] = useState<Estilista[]>([]);
  const [citas, setCitas] = useState<Cita[]>([]);
  const [servicioSeleccionado, setServicioSeleccionado] = useState('');
  const [estilistaSeleccionado, setEstilistaSeleccionado] = useState('');
  const [servicioSeleccionado1, setServicioSeleccionado1] = useState('');
  const [estilistaSeleccionado1, setEstilistaSeleccionado1] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [sucursal, setSucursal] = useState<Sucursal | null>(null);
  const [diasAbiertos, setDiasAbiertos] = useState<string[]>([]);
  
  

  const handleServiceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setServicioSeleccionado(e.target.value);
  };

  

  useEffect(() => {
    const citasRecuperadas = JSON.parse(localStorage.getItem('datosCitas') || '[]');
}, []);



const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const adjustedFechaCita = new Date(new Date(`${fecha}T${hora}:00`).getTime() - timezoneOffset);

    const fechaCita = new Date(`${fecha}T${hora}:00`);
    const servicio = servicios.find(s => s.nombreServicio === servicioSeleccionado);
    const idServicio = servicio ? servicio.idServicio : null;

    if(!idServicio /*|| verificarDisponibilidad(fechaCita,servicioSeleccionado,estilistaSeleccionado)*/){
        const primeracita ={
            fechaHora: adjustedFechaCita,
            nombreCliente: nombre,
            telefonoCliente: telefono,
            emailCliente: email,
            servicioscita: servicioSeleccionado,
            pagado: false,
            idEstilista: estilistaSeleccionado,
        }
        localStorage.setItem('primeracita', JSON.stringify(primeracita));
    }else{
        
        alert('Horario de la primera cita no disponible');
        while(citasProgramadas.length >0){
            citasProgramadas.pop();
        }
        
    }

    let todasDisponibles = true;    
    
        // for (const cita of citasProgramadas) {
        //     const citafechaveri = new Date(`${fecha}T${cita.hora}:00`);
        //     if (!idServicio || !verificarDisponibilidad(citafechaveri, cita.servicioSeleccionado)) {
        //         todasDisponibles = false;
        //         break;
        //     }
        // }
    
        if (todasDisponibles) {
            const datosCitas = citasProgramadas.map(cita => ({
                fechaHora: `${cita.fecha}T${cita.hora}:00`,
                nombreCliente: nombre,
                telefonoCliente: telefono,
                emailCliente: email,
                servicioscita: cita.servicioSeleccionado,
                pagado: false,
                idEstilista: cita.estilistaSeleccionado,
            }));
    
            localStorage.setItem('datosCitas', JSON.stringify(datosCitas));
            router.push('/pago')
        } else {
            alert('Una o más citas no están disponibles. segunda vuelta');
        }
    
};


  

const agregarNuevaCita = () => {

    if(citasProgramadas.length === 0){
    
    const timezoneOffset = new Date().getTimezoneOffset() * 60000;
    const adjustedFechaCita = new Date(new Date(`${fecha}T${hora}:00`).getTime() - timezoneOffset);
    
    const primeracita ={
        fechaHora: adjustedFechaCita,
        nombreCliente: nombre,
        telefonoCliente: telefono,
        emailCliente: email,
        servicioscita: servicioSeleccionado,
        pagado: false,
        idEstilista: estilistaSeleccionado,
    }
    let ultimaCita = primeracita;
    let nuevaHoraInicio: string | null = null;
    let duracionUltimoServicio = 0;

    if (ultimaCita) {
        const servicioUltimaCita = servicios.find(servicio => servicio.nombreServicio === ultimaCita.servicioscita);
        if (servicioUltimaCita) {
            duracionUltimoServicio = servicioUltimaCita.tiempomin;
            let horaFinUltimaCita = new Date(ultimaCita.fechaHora);
            horaFinUltimaCita = new Date(horaFinUltimaCita.getTime() + duracionUltimoServicio * 60000);
            nuevaHoraInicio = horaFinUltimaCita.toISOString().split('T')[1].substring(0, 5);
        }
    }

    if (nuevaHoraInicio) {
        setCitasProgramadas(prev => [...prev, {
            servicioSeleccionado: '',
            estilistaSeleccionado: '',
            fecha: fecha,
            hora: nuevaHoraInicio,
            tiempoInicio: null,
        }]);
    }
     else {
        alert("No se puede calcular la hora de inicio para la nueva cita1.");
    }
    }
    
    
    let ultimaCita = citasProgramadas[citasProgramadas.length -1];
    let nuevaHoraInicio: string | null = null;
    let duracionUltimoServicio = 0;

    if (ultimaCita) {
        const servicioUltimaCita = servicios.find(servicio => servicio.nombreServicio === ultimaCita.servicioSeleccionado);
        if (servicioUltimaCita) {
            duracionUltimoServicio = servicioUltimaCita.tiempomin;
            let horaFinUltimaCita = new Date(`${ultimaCita.fecha}T${ultimaCita.hora}:00`);
            horaFinUltimaCita = new Date(horaFinUltimaCita.getTime() + duracionUltimoServicio * 60000);
            nuevaHoraInicio = horaFinUltimaCita.toISOString().split('T')[1].substring(0, 5);
        }
    }

    if (nuevaHoraInicio) {
        setCitasProgramadas(prev => [...prev, {
            servicioSeleccionado: '',
            estilistaSeleccionado: '',
            fecha: fecha,
            hora: nuevaHoraInicio,
            tiempoInicio: null,
        }]);
    } else {        
        console.log('a')
        

    }
    

    
};

  


  
  
  

  useEffect(() => {

    
    const usuarioData = Cookies.get('usuario');
    if (usuarioData) {
        setUsuario(JSON.parse(usuarioData));
      }

      const cargarDatos = async () => {
        try {
            const estilistasRes = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/estilista`);
            const estilistasData = await estilistasRes.json();
            
            setEstilistas(estilistasData);

          const serviciosRes = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/servicio`);
          const serviciosData = await serviciosRes.json();
          setServicios(serviciosData);
  
          const citasRes = await fetch(`http://citaglam1.somee.com/api/sucursal/${idSucursal}/cita`);
          const citasData = await citasRes.json();
          setCitas(citasData);
  
          const sucursalRes = await fetch(`http://www.citaglam1.somee.com/api/negocio/${idNegocio}/sucursal`);
          const sucursalData = await sucursalRes.json();
          setSucursal(sucursalData[0]); 


          
        } catch (error) {
          console.error('Error al cargar datos', error);
        }
      };

      cargarDatos();


      
  }, []);

  useEffect(() => {
    if (servicioSeleccionado) {
      const filtrados = estilistas.filter(estilista =>
        estilista.serviciosestilista.split(',').map(servicio => servicio.trim()).includes(servicioSeleccionado)
      );
      setEstilistasFiltrados(filtrados);
    }
  }, [servicioSeleccionado, estilistas]);
  

    useEffect(() => {
        if (sucursal) {
          const dias = sucursal.diasAbierto.split(',').map(dia => dia.trim().toLowerCase());
          setDiasAbiertos(dias);
        }
      }, [sucursal]);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (usuario && e.target.checked) {
      const { name } = e.target;
      if (name === 'nombre') setNombre(usuario.nombreCliente);
      if (name === 'telefono') setTelefono(usuario.telefono);
      if (name === 'email') setEmail(usuario.correo);
    } else {
      setNombre('');
      setTelefono('');
      setEmail('');
    }
  };

  const obtenerTiempoMinDeServicio = (nombreServicio: string): number => {
    const servicio = servicios.find(s => s.nombreServicio === nombreServicio);
    return servicio ? servicio.tiempomin : 0; 
  };
  

  const validarFechaSeleccionada = (fecha: string): boolean => {
    const diaSemana = new Date(fecha).getDay(); // Domingo = 0, Lunes = 1, etc.
    const diasSemana = ['domingo', 'lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado'];
    
    return diasAbiertos.includes(diasSemana[diaSemana]);
  };

  const handleFechaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fechaSeleccionada = e.target.value;
    if (validarFechaSeleccionada(fechaSeleccionada)) {
      setFecha(fechaSeleccionada);
    } else {
      alert("La fecha seleccionada no está dentro de los días de operación de la sucursal.");
    }
  };
  
  
  const verificarDisponibilidad = (fechaCita: Date, nombreServicio: string, idEstilista: string): boolean => {
    const tiempomin = obtenerTiempoMinDeServicio(nombreServicio);
    const inicioCita = fechaCita;
    const finCita = new Date(inicioCita.getTime() + (tiempomin * 60000));
  
    if (!sucursal) {
      console.error("Información de la sucursal no disponible.");
      return false;
    }
  
    const fechaString = inicioCita.toISOString().split('T')[0];
    const horarioInicioSucursal = new Date(`${fechaString}T${sucursal.horarioInicio}`);
    const horarioFinSucursal = new Date(`${fechaString}T${sucursal.horarioFin}`);
  
    if (inicioCita < horarioInicioSucursal || finCita > horarioFinSucursal) {
      alert("La cita debe empezar y terminar dentro del horario de la sucursal.");
      return false;
    }

    // Suponemos que estás buscando el estilista por su nombre o ID
const estilistaEspecifico = estilistas.find(estilista => estilista.idEstilista.toString() === idEstilista);

if (!estilistaEspecifico) {
  console.error("Estilista específico no encontrado.");
  return false;
}

const horarioInicioEstilista = new Date(inicioCita);
horarioInicioEstilista.setHours(parseInt(estilistaEspecifico.horarioEntrada.split(":")[0]));
horarioInicioEstilista.setMinutes(parseInt(estilistaEspecifico.horarioEntrada.split(":")[1]));
horarioInicioEstilista.setSeconds(0);

const horarioFinEstilista = new Date(inicioCita);
horarioFinEstilista.setHours(parseInt(estilistaEspecifico.horarioSalida.split(":")[0]));
horarioFinEstilista.setMinutes(parseInt(estilistaEspecifico.horarioSalida.split(":")[1]));
horarioFinEstilista.setSeconds(0);

if (inicioCita < horarioInicioEstilista || finCita > horarioFinEstilista) {
  alert("La cita debe empezar y terminar dentro del horario del estilista.");
  return false;
}

  
    for (const cita of citas) {
        let inicioExistente = new Date(cita.fechaHora);
        let finExistente = new Date(inicioExistente.getTime() + obtenerTiempoMinDeServicio(nombreServicio) * 60000);
    
        if ((fechaCita >= inicioExistente && fechaCita < finExistente)) {
          return false;
        }
      }
  
    return true;
  };
  
  const handleServicioChange = (e: React.ChangeEvent<HTMLSelectElement>, index: number) => {
    const updatedCitas = [...citasProgramadas];
    updatedCitas[index].servicioSeleccionado = e.target.value;
    setCitasProgramadas(updatedCitas);
  
  };
  
  const handleEstilistaChange = (nombreServicioSeleccionado: string, index: number) => {
    const updatedCitas = [...citasProgramadas];
    updatedCitas[index].estilistaSeleccionado = nombreServicioSeleccionado;
    setCitasProgramadas(updatedCitas);
};
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAF4EF]">
      <Head>
        <title>Agendar Citas</title>
      </Head>

      <div className="lg:w-1/3 bg-[#EAE0D5] p-4 flex justify-center items-center">
        <Image
          src="/fondo6.png"
          alt="Salón de belleza"
          width={700}
          height={875}
          objectFit="cover"
        />
      </div>

      <div className="lg:w-2/3 p-8">
        <h2 className="text-3xl font-bold text-center mb-8">CITAS</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="nombre">
              NOMBRE
            </label>
            <input
              id="nombre"
              type="text"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-4 bg-white rounded-lg border border-gray-300"
              required
            />
            {usuario && (
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="nombre-checkbox"
                  name="nombre"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="nombre-checkbox">Usar el nombre de la cuenta</label>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="telefono">
              TELÉFONO
            </label>
            <input
              id="telefono"
              type="text"
              placeholder="Teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              className="w-full p-4 bg-white rounded-lg border border-gray-300"
              required
            />
            {usuario && (
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="telefono-checkbox"
                  name="telefono"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="telefono-checkbox">Usar el teléfono de la cuenta</label>
              </div>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
              EMAIL
            </label>
            <input
              id="email"
              type="email"
              placeholder="Correo Electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 bg-white rounded-lg border border-gray-300"
              required
            />
            {usuario && (
              <div className="flex items-center mt-2">
                <input
                  type="checkbox"
                  id="email-checkbox"
                  name="email"
                  onChange={handleCheckboxChange}
                  className="mr-2"
                />
                <label htmlFor="email-checkbox">Usar el email de la cuenta</label>
              </div>
            )}
          </div>

            <div>
                <label htmlFor="servicio" className="block mb-2 text-sm font-bold text-gray-700">
                    SERVICIO
                </label>
                <select
                    id="servicio"
                    value={servicioSeleccionado}
                    onChange={(e) => setServicioSeleccionado(e.target.value)}
                    className="w-full p-4 bg-white rounded-lg border border-gray-300"
                    required
                >
                    <option value="">Seleccione un Servicio</option>
                    {servicios.map((servicio) => (
                    <option key={servicio.nombreServicio} value={servicio.nombreServicio}>
                        {servicio.nombreServicio} - ${servicio.coste} - {servicio.tiempomin} minutos
                    </option>
                    ))}
                </select>
            </div>

            {estilistasFiltrados.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold mb-2">Estilistas Disponibles:</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {estilistasFiltrados.map((estilista) => (
                        <div 
                        key={estilista.nombreEstilista} 
                        className={`border rounded-lg p-4 flex flex-col items-center text-center ${estilistaSeleccionado === estilista.idEstilista.toString() ? "bg-[#EAE0D5]" : "bg-white"}`} // Cambia el color de fondo si el estilista está seleccionado
                        onClick={() => setEstilistaSeleccionado(estilista.idEstilista.toString())}
                        style={{ cursor: "pointer" }}
                        >
                        <img src={estilista.imagenUrl} alt={estilista.nombreEstilista} className="w-24 h-24 rounded-full mb-2" />
                        <p className="text-md font-semibold">{estilista.nombreEstilista}</p>
                        <p>{`Sexo: ${estilista.sexo}`}</p>
                        <p>{`Horario: ${estilista.horarioEntrada} - ${estilista.horarioSalida}`}</p>
                        
                        </div>
                    ))}
                    </div>
                </div>
                )}

            {estilistaSeleccionado && (
            <div>
                <div className="mt-4">
                <label htmlFor="fecha" className="block mb-2 text-sm font-bold text-gray-700">
                    Fecha
                </label>
                <input
                    type="date"
                    id="fecha"
                    value={fecha}
                    onChange={handleFechaChange}
                    className="w-full p-4 bg-white rounded-lg border border-gray-300"
                    required
                />
                </div>
                <div className="mt-4">
                <label htmlFor="hora" className="block mb-2 text-sm font-bold text-gray-700">
                    Hora
                </label>
                <input
                    type="time"
                    id="hora"
                    value={hora}
                    onChange={(e) => setHora(e.target.value)}
                    className="w-full p-4 bg-white rounded-lg border border-gray-300"
                    required
                />
                </div>
            </div>
            )}

{citasProgramadas.map((cita, index) => (
  <div key={index} className="mb-4">
    <h3 className="text-lg font-semibold">Cita {index + 2}</h3>
    <div className="flex flex-col gap-4">
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Servicio</label>
        <select
          value={cita.servicioSeleccionado}
          onChange={(e) => handleServicioChange(e, index)}
          className="w-full p-4 bg-white rounded-lg border border-gray-300"
        >
          <option value="">Seleccione un Servicio</option>
          {servicios.map((servicio) => (
            <option key={servicio.nombreServicio} value={servicio.nombreServicio.toString()}>
              {servicio.nombreServicio} - ${servicio.coste}
            </option>
          ))}
        </select>
      </div>
      
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">Estilista</label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {estilistas.filter(estilista => 
            estilista.serviciosestilista.includes(cita.servicioSeleccionado)
          ).map((estilista) => (
            <div key={estilista.idEstilista} onClick={() => handleEstilistaChange(estilista.idEstilista.toString(), index)} className={`border rounded-lg p-4 flex flex-col items-center text-center ${cita.estilistaSeleccionado === estilista.idEstilista.toString() ? "bg-[#EAE0D5]" : "bg-white"}`} style={{ cursor: "pointer" }}>
              <img src={estilista.imagenUrl} alt="Estilista" className="w-24 h-24 rounded-full mb-2" />
              <p className="text-md font-semibold">{estilista.nombreEstilista}</p>
              <p>Sexo: {estilista.sexo}</p>
              <p>Horario: {estilista.horarioEntrada} - {estilista.horarioSalida}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
))}



    <button type="button" onClick={agregarNuevaCita} className="my-4">Agregar otro servicio</button>
    <button type="submit" className="w-full p-4 bg-[#B18362] text-white rounded-lg font-bold uppercase">Proceder a Pago</button>
        </form>
      </div>
    </div>
  );
};

export default AgendarCitas;