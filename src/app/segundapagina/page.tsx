import React from 'react';
import Head from 'next/head';
import NavBar from './components/NavBar';
import ImageSlider from './components/ImageSlider';
import styles from './styles/home.module.css';

const images =[
  '/slider1.png',
  '/slider2.png',
  '/slider3.png',
  '/slider4.png',

];
export default function page() {
  return (
    <div className={styles.container}>
      <Head>
        <title>CitaGlam</title>
      </Head>

      <NavBar />

      <ImageSlider images={images} />

      <footer className={styles.footer}>
        CitaGlam
      </footer>
    </div>
  );

}
