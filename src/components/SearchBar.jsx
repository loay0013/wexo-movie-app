import { useState } from "react";

function SearchBar({ onSearch }) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(query.trim());
    };

    return (
        <form onSubmit={handleSubmit} className="flex items-center gap-2 mb-6">
            <input
                type="text"
                placeholder="Søg efter film..."
                className="w-full md:w-96 px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button
                type="submit"
                className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
            >
                Søg
            </button>
        </form>
    );
}

export default SearchBar;
