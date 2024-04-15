'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Head from 'next/head';
import Cookies from 'js-cookie';

interface User {
  idUsuario: number;
  nombreCliente: string;
  telefono: string;
  correo: string;
  contraseña: string;
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Hook para manejar la redirección

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('http://citaglam1.somee.com/api/usuario');
      const users: User[] = await response.json();

      const user = users.find((user) => user.correo === email && user.contraseña === password);

      if (user) {
        // El usuario existe y la contraseña coincide, redirigir a segundapagina
        Cookies.set('usuario', JSON.stringify(user), { expires: 1 });
        router.push('/inicio'); // Usa el nombre de la ruta a la que deseas redirigir.
    } else {
    // El usuario no existe o la contraseña no coincide
    alert('Credenciales incorrectas'); // Mostrar un mensaje adecuado
    }
    } catch (error) {
    console.error('Error al realizar la solicitud fetch', error);
    alert('Hubo un problema al intentar iniciar sesión.'); // Mostrar un mensaje adecuado
    }
    };
    
    return (
    <div className="flex items-center justify-center min-h-screen bg-[#F3E2D9]">
    <Head>
    <title>Login</title>
    </Head>
    <div className="w-full max-w-xs p-8 bg-[#DECBB7] rounded-lg shadow-md">
    <form onSubmit={handleSubmit}>
    <div className="mb-4">
    <label className="block text-sm font-bold text-gray-700" htmlFor="email">
    Correo Electrónico
    </label>
    <input
    className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    id="email"
    type="email"
    placeholder="Correo Electrónico"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    required
    />
    </div>
    <div className="mb-6">
    <label className="block text-sm font-bold text-gray-700" htmlFor="password">
    Contraseña
    </label>
    <input
    className="w-full px-3 py-2 mb-3 text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
    id="password"
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    required
    />
    <p className="text-xs italic text-gray-500">¿Olvidaste tu contraseña?</p>
    </div>
    <div className="flex items-center justify-between">
    <button
               className="w-full px-4 py-2 font-bold text-white bg-[#A17E68] rounded hover:bg-[#8C6B58] focus:outline-none focus:shadow-outline"
               type="submit"
             >
    INICIAR
    </button>
    </div>
    </form>
    <p className="text-xs text-center text-gray-500">
    ¿No tienes cuenta? <a href="/registrocliente" className="text-[#8C6B58] hover:text-[#7A5A48]">Registrarse</a>
    </p>
    </div>
    </div>
    );
    };
    
    export default Login;
