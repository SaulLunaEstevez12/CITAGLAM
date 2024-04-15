import Link from "next/link"
import Image from "next/image"
export default function servicios() {
    return (
        <div className="flex flex-col h-auto w-auto bg-red-200">
            <div className="h-24 w-auto">
                <nav id="NAVBAR"
                    className="h-20 w-auto z-10 flex flex-row gap-32 text-3xl font-extrabold font-serif  text-white  relative justify-end items-center">
                        <Link href={"#"} className="flex">Inicio</Link>
                        <Link href={"#"}>Elige  Tu  Sucursal</Link>
                        <Link href={"#"}>Servicios</Link>
                        <Link href={"#"}>Citas</Link>
                </nav>
            </div>
            <div className=" w-auto h-screen">
                <div className="items-center z-10 relative flex font-extrabold text-white justify-center top-1/3 text-4xl font-serif">
                    <p>¿Que Hacemos?
                        <br></br>
                        Servicios
                    </p>
                </div>
                <Image
                    src="/servicioBelleza.jpeg"
                    alt="Portada"
                    fill={true}
                />
            </div>
            <div className="w-auto h-auto">
                <div className="flex items-center justify-center gap-80">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>CORTE</h2>
                            </li>
                            <li>Corte de Dama ----------------------------------------------------------</li>
                            <li>Corte de Caballero ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/corte.jpg"
                    alt="corte"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center gap-80 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>MANICURE</h2>
                            </li>
                            <li>Manicure Nail Art ----------------------------------------------------------</li>
                            <li>Manicure De Gel ----------------------------------------------------------</li>
                            <li>Manicure Acrílico ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/manicure.jpg"
                    alt="manicure"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center gap-72 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>TEÑIR EL CABELLO</h2>
                            </li>
                            <li>Tinte (Sin Decoloración) ----------------------------------------------------------</li>
                            <li>Baño de Color ----------------------------------------------------------</li>
                            <li>Efecto Alta Decoloración ----------------------------------------------------------</li>
                            <li>Efecto Media Decoloración ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/teñir.jpg"
                    alt="teñir"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center gap-72 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>PEINADO Y MAQUILLAJE</h2>
                            </li>
                            <li>Planchado Express ----------------------------------------------------------</li>
                            <li>Secado Volumen  ----------------------------------------------------------</li>
                            <li>Peinado Recogido ----------------------------------------------------------_</li>
                            <li>Peinado Semirecogido  ----------------------------------------------------------</li>
                            <li>Maquillaje ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/maquillaje.jpg"
                    alt="maquillaje"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center gap-72 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>CORTE DE BARBA</h2>
                            </li>
                            <li>De Candado o Perilla ----------------------------------------------------------</li>
                            <li>Estilo Garibaldi ----------------------------------------------------------</li>
                            <li>Estilo Goattee ----------------------------------------------------------_</li>
                            <li>Barba Van Dyke ----------------------------------------------------------</li>
                            <li>Estilo Hypster ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/barba.jpg"
                    alt="barba"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center gap-72 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>AFEITADO</h2>
                            </li>
                        </ol>
                    </div>
                    <Image
                    src="/afeitado.jpg"
                    alt="afeitado"
                    width={200}
                    height={100}
                    />
                </div>

                <div className="flex items-center justify-center mb-8 gap-72 mt-20">
                    <div className="text-xl font-serif">
                        <ol>
                            <li>
                                <h2>SPA</h2>
                            </li>
                            <li>Masajes --------------------------------------------------------------------------------------------------------------------</li>
                            <li>Tratamientos Corporales ----------------------------------------------------------</li>
                            <li>Tratamientos Faciales ----------------------------------------------------------</li>
                            <li>Baños de hidromasaje y terapias de agua ----------------------------------------------------------</li>
                        </ol>
                    </div>
                    <Image
                    src="/spa.jpg"
                    alt="spa"
                    width={200}
                    height={100}
                    />
                </div>
            </div>
        </div>
    )
}