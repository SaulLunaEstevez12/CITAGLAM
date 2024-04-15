import Image from "next/image"
import "@fortawesome/fontawesome-free/css/all.css";
export default function emailintro(){
    return(
        <div className=" flex flex-col justify-center items-center w-screen h-screen">
            <div className="w-1/3 h-auto flex flex-col justify-center items-center  bg-[#D9D9D9] bg-opacity-50 z-10 relative">
                <div className="icon-container">
                    <i className="fas fa-envelope fa-fw mt-10 text-[#ba9981] z-g10 relative icon items-center" style={{ fontSize: "80px" }} />
                </div>
                <div className="z-10 mt-10 text-xl font-serif relative">
                    <p>Por favor ingresa tu correo electrónico</p>
                </div>
                <div className="z-10 relative mt-10">
                    <input type="text-" className="border p-4 w-80 h-10 rounded-lg" placeholder="Correo"/>
                </div>
                <div className=" mt-20 mb-20 z-10 relative">
                    <button className="border p-4 w-28 h-10 flex items-center justify-center rounded-lg bg-[#ba9981]">
                      Continuar
                    </button>
                </div>
            </div>
            <Image
                    src="/pass.jpg"
                    alt="Portada"
                    fill={true}
                />
        </div>
    )
}