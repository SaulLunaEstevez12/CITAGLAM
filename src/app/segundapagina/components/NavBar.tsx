import React from 'react';
import Link from 'next/link';
import styles from '../styles/NavBar.module.css';

const NavBar: React.FC = () => {
  return (
    <nav className={styles.nav}>
      <Link href="/">
        {/* <a>Inicio</a> */}
      </Link>
      <Link href="/sucursales">
        {/* <a>Elige tu sucursal</a> */}
      </Link>
      <Link href="/servicios">
        {/* <a>Servicios</a> */}
      </Link>
      <Link href="/citas">
        {/* <a>Citas</a> */}
      </Link>
    </nav>
  );
};

export default NavBar;