// pages/registro.tsx
'use client'
import { useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Head from 'next/head';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const captcha = useRef<any>(null);
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [telefono, setTelefono] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!captcha.current.getValue()){
      alert('Por favor, completa el captcha.');
      return;
    }
    
    // Verificar si las contraseñas coinciden
    if (contrasena !== confirmarContrasena) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    // Preparar el objeto con los datos del usuario
    const userData = {
      nombreCliente: nombre,
      telefono: telefono,
      correo: correo,
      contraseña: contrasena,
    };

    try {
      // Enviar la solicitud POST a la API
      const response = await fetch('http://citaglam1.somee.com/api/usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        // Si la respuesta es exitosa, redirigir a la segunda página
        router.push('/segundapagina');
      } else {
        // Si hay un error en la respuesta, mostrar un mensaje
        alert('Error al registrar el usuario.');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud fetch', error);
      alert('Hubo un problema al intentar registrar el usuario.');
    }
  };


  // Adjust the onchange function to correctly match the expected signature
const onchange = (token: string | null) => {
  console.log('captcha value:', token);
};



  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3E2D9]">
      <Head>
        <title>Registro</title>
      </Head>
      <div className="flex w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="md:flex w-full">
          <div className="hidden md:block md:w-1/2 relative">
            <Image 
              src="/fondo5.png" // Asegúrate de tener una imagen con este nombre en la carpeta 'public'.
              alt="Salón de belleza"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 bg-[#F0E6DE] p-8 flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm appearance-none"
                required
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm appearance-none"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(e) => setContrasena(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm appearance-none"
                required
              />
              <input
                type="password"
                placeholder="Confirmar Contraseña"
                value={confirmarContrasena}
                onChange={(e) => setConfirmarContrasena(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm appearance-none"
                required
              />
              <input
                type="text"
                placeholder="Teléfono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm appearance-none ]"
                required
              />
              <div className='recaptcha'>
                <ReCAPTCHA
                  ref={captcha}
                  sitekey="6LeTS7YpAAAAAPOI_aJg9UPbK0WZhRj8e7Ab4DfZ"
                  onChange={onchange}
                />

              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#B18362] text-black rounded-lg font-semibold shadow-md hover:bg-[#9f765b] focus:outline-none focus:ring-2 focus:ring-[#B18362] focus:ring-opacity-50"
              >
                INICIAR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registro;
