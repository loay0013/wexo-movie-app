import { useEffect, useRef, useState } from "react";
import { fetchMoviesByGenre, fetchMoviesByQuery } from "../api/tmdb";

const GENRES_TO_DISPLAY = [
    { id: 28, name: "Action" },
    { id: 35, name: "Comedy" },
    { id: 53, name: "Thriller" },
    { id: 10752, name: "War" },
    { id: 10749, name: "Romance" },
    { id: 18, name: "Drama" },
    { id: 80, name: "Crime" },
    { id: 99, name: "Documentary" },
    { id: 27, name: "Horror" },
];

function HomePage() {
    const [moviesByGenre, setMoviesByGenre] = useState({});
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const sliderRefs = useRef({});

    useEffect(() => {
        async function loadAll() {
            const data = {};
            for (const genre of GENRES_TO_DISPLAY) {
                const res = await fetchMoviesByGenre(genre.id);
                data[genre.id] = res.results.slice(0, 50);
            }
            setMoviesByGenre(data);
        }

        loadAll();
    }, []);

    useEffect(() => {
        async function search() {
            if (searchQuery.trim() === "") {
                setSearchResults([]);
                return;
            }
            const res = await fetchMoviesByQuery(searchQuery);
            setSearchResults(res.results);
        }

        const delay = setTimeout(() => {
            search();
        }, 500);

        return () => clearTimeout(delay);
    }, [searchQuery]);

    const scrollLeft = (id) => {
        sliderRefs.current[id]?.scrollBy({ left: -300, behavior: "smooth" });
    };

    const scrollRight = (id) => {
        sliderRefs.current[id]?.scrollBy({ left: 300, behavior: "smooth" });
    };

    return (
        <div className="p-6 space-y-12 bg-black text-white min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Velkommen til MovieApp 🎬</h1>

            {/* 🔍 Søgefelt */}
            <div className="max-w-md">
                <input
                    type="text"
                    placeholder="Søg efter film..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none"
                />
            </div>

            {/* 🎯 Søgeresultater */}
            {searchQuery && searchResults.length > 0 && (
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-white">Søgeresultater</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {searchResults.map((movie) => (
                            <div key={movie.id}>
                                <a href={`/movie/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded-lg h-[240px] object-cover"
                                    />
                                    <h3 className="text-sm font-medium mt-2 line-clamp-2 text-white">{movie.title}</h3>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* 🎬 Genrelister */}
            {!searchQuery &&
                GENRES_TO_DISPLAY.map((genre) => (
                    <div key={genre.id} className="relative group">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-2xl font-semibold text-white">{genre.name}</h2>
                            <a
                                href={`/genre/${genre.id}`}
                                className="text-blue-400 hover:underline text-sm"
                            >
                                Se alle
                            </a>
                        </div>

                        <button
                            onClick={() => scrollLeft(genre.id)}
                            className="hidden group-hover:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black px-2 py-3 text-white"
                        >
                            ◀
                        </button>

                        <button
                            onClick={() => scrollRight(genre.id)}
                            className="hidden group-hover:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black px-2 py-3 text-white"
                        >
                            ▶
                        </button>

                        <div
                            ref={(el) => (sliderRefs.current[genre.id] = el)}
                            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory hide-scrollbar py-2"
                        >
                            {moviesByGenre[genre.id]?.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="min-w-[160px] flex-shrink-0 snap-start"
                                >
                                    <a href={`/movie/${movie.id}`}>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="rounded-lg mb-2 h-[240px] object-cover shadow-md hover:scale-105 transition"
                                        />
                                        <h3 className="text-sm font-medium text-white leading-snug line-clamp-2 mt-1 min-h-[3.2rem]">
                                            {movie.title}
                                        </h3>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
        </div>
    );
}

export default HomePage;
