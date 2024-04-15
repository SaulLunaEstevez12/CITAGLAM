export default function Page() {
    return (
        <div className="font-sans min-h-screen grid grid-cols-2 bg-[rgba(188,171,155,123)]">
            <div className="flex justify-center items-center bg-gradient-to-b from-[#8f8479] to-[#edded0]">
                <div className="w-75 p-64 mb-2.5 bg-transparent rounded-lg text-center transform -translate-x-12 translate-y-12">
                    <div className="text-5xl mb-6">👤</div>
                    <h1 className="mb-5 text-3xl">Ingresar como:</h1>
                    <a href="/iniciocliente" className="block w-full px-32 py-4 mb-2.5 text-base font-normal text-black bg-white border-none rounded cursor-pointer hover:bg-[rgb(208,186,164)] focus:outline-none">
                        CLIENTE
                    </a>
                    <a href="/inicio" className="block w-full px-4 py-4 text-base font-normal text-black bg-white border-none rounded cursor-pointer hover:bg-[rgb(208,186,164)] focus:outline-none">
                        INVITADO
                    </a>
                </div>
            </div>
            <div className="bg-[url('/mons.jpeg')] object-contain bg-center"></div>
        </div>
    )
}