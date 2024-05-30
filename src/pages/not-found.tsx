import { Link } from "react-router-dom";

export function NotFound() {
    return (
        <div className="px-10 h-screen flex flex-col justify-center items-center">
            <div className="flex flex-col mt-2 mb-2 w-full max-w-xl items-center gap-4">
                <h1 className="text-2xl font-medium">Página não encontrada :(</h1>
                <p>Essa pagina não existe!</p>
                <Link to="/" className="border border-gray-400 px-6 py-2 rounded-lg hover:bg-slate-500/30">Volte ao início</Link>
            </div>
        </div>
    )
}