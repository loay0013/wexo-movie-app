import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchMoviesByGenre } from "../api/tmdb";

function GenrePage() {
    const { id } = useParams();
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadMovies() {
            setLoading(true);
            const res = await fetchMoviesByGenre(id);
            setMovies(res.results);
            setLoading(false);
        }

        loadMovies();
    }, [id]);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Film i genren</h1>

            {loading ? (
                <p>Indlæser film...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {movies.map((movie) => (
                        <div key={movie.id} className="bg-white rounded shadow p-2">
                            <a href={`/movie/${movie.id}`}>
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.title}
                                    className="rounded mb-2"
                                />
                                <h3 className="text-sm font-medium">{movie.title}</h3>
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default GenrePage;
