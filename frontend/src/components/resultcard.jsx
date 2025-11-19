// ResultCard.jsx
import { ExternalLink } from "lucide-react";


export default function ResultCard({ item }) {
    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-3 border border-gray-200">
            <div className="w-full h-48 overflow-hidden rounded-xl bg-gray-100">
                {item.thumbnail ? (
                    <img
                        src={item.thumbnail}
                        alt={item.title || "Meme"}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                        Sem miniatura
                    </div>
                )}
            </div>


            <div className="mt-3 flex flex-col gap-2">
                <h3 className="text-lg font-semibold line-clamp-2">
                    {item.title || "Vídeo de meme"}
                </h3>


                <button
                    onClick={() => window.open(item.url, "_blank")}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition"
                >
                    Abrir <ExternalLink size={18} />
                </button>
            </div>
        </div>
    );
}