import { useState } from "react";
import SearchBar from "../components/SearchBar";
import ResultCard from "../components/ResultCard";

export default function Search() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);

    const handleSearch = async (query) => {
        if (!query) return;
        setLoading(true);
        try {
            const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
            const data = await res.json();
            setResults(data.results || []);
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center gap-6">
            <h1 className="text-4xl font-bold">Search</h1>
            <SearchBar onSearch={handleSearch} />

            {loading && <p className="text-lg">Carregando...</p>}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-5xl">
                {!loading && results.map((item, i) => (
                    <ResultCard key={i} item={item} />
                ))}
            </div>
        </div>
    );
}
