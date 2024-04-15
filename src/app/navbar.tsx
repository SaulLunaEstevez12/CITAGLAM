import Link from 'next/link';


const Navbar = () => {
  return (
    <nav >
      <Link href="/iniciosucursal">
        <h1>Sucursal</h1>
        
      </Link>
      <Link href="/iniciocliente">
        <h1>cliente</h1>
        
      </Link>
      <Link href="/inicioestilista">
        <h1>estilista</h1>
        
      </Link>
      <Link href="/segundapagina">
        <h1>inicio</h1>
        
      </Link>
    </nav>
  );
};

export default Navbar;
