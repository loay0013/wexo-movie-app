import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";
import { motion,AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";

function WishlistPage() {
    const { wishlist, removeFromWishlist } = useWishlist();

    return (
        <div className="p-6 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold text-white mb-6">Din ønskeliste</h1>

            {wishlist.length === 0 ? (
                <div className="flex flex-col items-center text-center mt-16 text-white/70">
                    <Heart size={64} className="mb-4 opacity-30" />
                    <p className="text-xl font-medium">Du har endnu ingen film på ønskelisten.</p>
                    <p className="text-sm text-white/50 mt-1">Gå tilbage og tilføj dine favoritter ⭐️</p>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    <AnimatePresence>
                        {wishlist.map((movie) => (
                            <motion.div
                                key={movie.id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.3 }}
                                className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative group"
                            >
                                <Link to={`/movie/${movie.id}`}>
                                    <img
                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                        alt={movie.title}
                                        className="w-full h-[300px] object-cover"
                                    />
                                    <div className="p-3">
                                        <h3 className="text-white text-base font-semibold">{movie.title}</h3>
                                    </div>
                                </Link>
                                <button
                                    onClick={() => removeFromWishlist(movie.id)}
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-full shadow transition"
                                >
                                    Fjern
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    );
}

export default WishlistPage;

