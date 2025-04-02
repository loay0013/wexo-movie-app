import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useWishlist } from "../context/WishlistContext";
import { fetchMovieDetails, fetchSimilarMovies } from "../api/tmdb";

function MovieDetailsPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [similar, setSimilar] = useState([]);

    const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

    const handleWishlistClick = () => {
        if (isInWishlist(movie.id)) {
            removeFromWishlist(movie.id);
        } else {
            addToWishlist({
                id: movie.id,
                title: movie.title,
                poster_path: movie.poster_path,
            });
        }
    };

    useEffect(() => {
        async function loadDetails() {
            setLoading(true);
            const data = await fetchMovieDetails(id);
            setMovie(data);
            setLoading(false);
        }

        async function loadSimilar() {
            const res = await fetchSimilarMovies(id);
            setSimilar(res.slice(0, 6));
        }

        loadDetails();
        loadSimilar();
    }, [id]);

    if (loading || !movie) return <p className="p-6 text-white">Indlæser detaljer...</p>;

    const year = movie.release_date?.split("-")[0];
    const directors = movie.credits.crew.filter((p) => p.job === "Director");
    const actors = movie.credits.cast.slice(0, 5);
    const inList = isInWishlist(movie.id);

    return (
        <div className="relative min-h-screen text-white">
            {/* Baggrundsbillede */}
            <div
                className="absolute inset-0 bg-cover bg-center blur-sm opacity-30"
                style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                }}
            ></div>

            {/* Indhold */}
            <div className="relative z-10 max-w-6xl mx-auto px-4 py-10">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="w-64 rounded-xl shadow-xl"
                    />

                    <div className="flex-1">
                        <h1 className="text-4xl font-bold mb-2">
                            {movie.title} <span className="text-white/60 text-2xl">({year})</span>
                        </h1>

                        <p className="mb-4 text-white/90">{movie.overview}</p>

                        <p><strong>Genre:</strong> {movie.genres.map((g) => g.name).join(", ")}</p>
                        <p><strong>Instruktør:</strong> {directors.map((d) => d.name).join(", ")}</p>
                        <p><strong>Skuespillere:</strong> {actors.map((a) => a.name).join(", ")}</p>

                        <button
                            onClick={handleWishlistClick}
                            className={`mt-4 px-4 py-2 rounded text-white transition ${
                                inList ? "bg-red-500 hover:bg-red-600" : "bg-pink-500 hover:bg-pink-600"
                            }`}
                        >
                            {inList ? "Fjern fra ønskeliste" : "Tilføj til ønskeliste"}
                        </button>

                    </div>
                </div>

                {/* Lignende film */}
                {similar.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl font-bold mb-4">Lignende film</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                            {similar.map((movie) => (
                                <Link
                                    to={`/movie/${movie.id}`}
                                    key={movie.id}
                                    className="bg-gray-800 hover:bg-gray-700 p-2 rounded-lg transition"
                                >
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="rounded mb-2 h-[250px] object-cover w-full"
                                    />
                                    <p className="text-sm text-white">{movie.title}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieDetailsPage;
