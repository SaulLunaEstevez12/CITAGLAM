import Image from "next/image"
import "@fortawesome/fontawesome-free/css/all.css";
export default function email(){
    return(
        <div className=" flex flex-col justify-center items-center w-screen h-screen">
            <div className="w-1/3 h-auto flex flex-col justify-center items-center bg-[#D9D9D9] bg-opacity-50 z-10 relative">
                <div className="icon-container">
                    <i className="fas fa-envelope-circle-check fa-fw mt-10 text-[#ba9981] z-g10 relative icon items-center" style={{ fontSize: "80px" }} />
                </div>
                <div className="z-10 mt-10 text-xl font-serif relative">
                    <p>Por favor ingresa el código de 4 dígitos que se a</p>
                    <p>enviado a franciscopechtun712@gmail.com</p>
                </div>
                <div className="grid grid-cols-4 space-x-4 z-10 relative mt-10">
                    <input type="text" className="border p-4 w-10 h-10 rounded-lg" placeholder=""/>
                    <input type="text" className="border p-4 w-10 h-10 rounded-lg" placeholder=""/>
                    <input type="text" className="border p-4 w-10 h-10 rounded-lg" placeholder=""/>
                    <input type="text" className="border p-4 w-10 h-10 rounded-lg" placeholder=""/>
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