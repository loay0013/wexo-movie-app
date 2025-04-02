import { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { Menu, X } from "lucide-react"; // Ikoner (valgfrit, kan bruge Unicode også)

function Navbar() {
    const { wishlist } = useWishlist();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => setMenuOpen(!menuOpen);

    return (
        <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
            <Link to="/" className="text-xl font-bold">
                🎬 MovieApp
            </Link>

            {/* Desktop menu */}
            <div className="hidden md:flex space-x-4">
                <Link to="/" className="hover:underline">
                    Forside
                </Link>
                <Link to="/wishlist" className="hover:underline relative">
                    Ønskeliste
                    {wishlist.length > 0 && (
                        <span className="ml-1 bg-pink-500 text-xs px-2 py-0.5 rounded-full">
              {wishlist.length}
            </span>
                    )}
                </Link>
            </div>


            {/* Mobile menu toggle */}
            <button className="md:hidden" onClick={toggleMenu}>
                {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Mobile dropdown menu */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-gray-800 text-white flex flex-col items-start p-4 md:hidden z-50">
                    <Link to="/" className="py-2" onClick={() => setMenuOpen(false)}>
                        Forside
                    </Link>
                    <Link to="/wishlist" className="py-2" onClick={() => setMenuOpen(false)}>
                        Ønskeliste
                        {wishlist.length > 0 && (
                            <span className="ml-2 bg-pink-500 text-xs px-2 py-0.5 rounded-full">
                {wishlist.length}
              </span>
                        )}
                    </Link>
                </div>
            )}
        </nav>
    );
}

export default Navbar;
