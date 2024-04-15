import Head from 'next/head';
import Navbar from './navbar';

export default function Home() {
  return (
    <div>
      <Head>
        <title>CITAGLAM</title>
        <meta name="description" content="CITAGLAM - Reserva tu cita para peinado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main >
        <div >
          <h1 >Peinado</h1>

        </div>
      </main>
    </div>
  );
}
