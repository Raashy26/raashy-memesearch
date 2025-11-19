// SearchBar.jsx
import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="w-full max-w-2xl flex items-center bg-white shadow-lg rounded-2xl p-4 gap-3 border border-gray-200"
        >
            <Search className="w-6 h-6 text-gray-500" />
            <input
                type="text"
                placeholder="Procura vídeos de memes..."
                className="flex-1 outline-none text-lg"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-lg font-semibold transition"
            >
                Buscar
            </button>
        </form>
    );
}