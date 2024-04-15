// pages/registro-negocio.tsx
'use client'
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import ReCAPTCHA from 'react-google-recaptcha';
import Image from 'next/image';
import Head from 'next/head';

const RegistroNegocio = () => {
  const [nombreNegocio, setNombreNegocio] = useState('');
  const [nombreDueño, setNombreDueño] = useState('');
  const captcha = useRef<any>(null);
  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContrasena, setConfirmarContrasena] = useState('');
  const [imagen, setImagen] = useState<null | File>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captcha.current.getValue()){
        alert('Por favor, completa el captcha.');
        return;
      }

    if (contraseña !== confirmarContrasena) {
        alert('Las contraseñas no coinciden.');
        return;
      }
  
    const formData = new FormData();
    formData.append('NombeNegocio', nombreNegocio);
    formData.append('NombreDueño', nombreDueño);
    formData.append('Correo', correo);
    formData.append('Contraseña', contraseña);
    if (imagen) {
      formData.append('Imagen', imagen);
    }
  console.log('formDataantes:', formData.get('NombreNegocio'));
    try {
      // Envía la solicitud POST a la API
      const response = await fetch('http://www.citaglam1.somee.com/api/negocio', {
        method: 'POST',
        body: formData, // Aquí enviamos formData porque es un envío que incluye un archivo
        // Nota: No establecemos el 'Content-Type' aquí. Dejar que el navegador lo haga permite que se establezca el 'boundary' correctamente.
      });
  
      if (response.ok) {
        // La respuesta de la API fue exitosa
        const responseData = await response.json();
        // Aquí puedes hacer algo con la respuesta, como redirigir al usuario o mostrar un mensaje de éxito
        console.log('Negocio registrado con éxito:', responseData);
        alert('Negocio registrado con éxito.');
  
        // Opcional: Redirigir al usuario o actualizar el estado de la aplicación aquí
        // Por ejemplo: router.push('/ruta-a-donde-ir-despues-de-registrar');
      } else {
        // Maneja una respuesta no exitosa
        console.error('Error al registrar el negocio. Respuesta no exitosa del servidor.');
        alert('Error al registrar el negocio.');
      }
    } catch (error) {
      // Maneja errores de la solicitud fetch, como problemas de red
      console.error('Error al realizar la solicitud fetch', error);
      alert('Hubo un problema al intentar registrar el negocio.');
    }
  };
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImagen(e.target.files[0]);
    }
  };

  const onchange = (token: string | null) => {
    console.log('captcha value:', token);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3E2D9]">
      <Head>
        <title>Registro de Negocio</title>
      </Head>
      <div className="flex w-full max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-lg">
        <div className="md:flex w-full">
          <div className="hidden md:block md:w-1/2 relative">
            <Image 
              src="/fondo5.png" // Asegúrate de que esta imagen existe en tu directorio 'public'.
              alt="Imagen decorativa"
              layout="fill"
              objectFit="cover"
              className="rounded-l-lg"
            />
          </div>
          <div className="w-full md:w-1/2 bg-[#F0E6DE] p-8 flex flex-col justify-center">
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                placeholder="Nombre del Negocio"
                value={nombreNegocio}
                onChange={(e) => setNombreNegocio(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm"
                required
                />

              <input
                type="text"
                placeholder="Nombre del Dueño"
                value={nombreDueño}
                onChange={(e) => setNombreDueño(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm"
                required
              />
              <input
                type="email"
                placeholder="Correo Electrónico"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm"
                required
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm"
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
                type="file"
                onChange={handleImageChange}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded shadow-sm"
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
                className="w-full px-4 py-2 bg-[#B18362] text-white rounded-lg font-semibold shadow-md hover:bg-[#9f765b] focus:outline-none focus:ring-2 focus:ring-[#B18362] focus:ring-opacity-50"
              >
                Registrar Negocio
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroNegocio;
