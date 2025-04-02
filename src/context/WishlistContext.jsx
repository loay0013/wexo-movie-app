import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const WishlistContext = createContext();

export function WishlistProvider({ children }) {
    const [wishlist, setWishlist] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Forbedret localStorage indlæsning
    useEffect(() => {
        try {
            const stored = localStorage.getItem("wishlist");
            if (stored) {
                const parsedWishlist = JSON.parse(stored);
                // Tilføj yderligere validering
                if (Array.isArray(parsedWishlist)) {
                    setWishlist(parsedWishlist);
                }
            }
        } catch (err) {
            console.error("Kunne ikke indlæse wishlist:", err);
            // Nulstil localStorage hvis der er en parsing-fejl
            localStorage.removeItem("wishlist");
        } finally {
            setIsLoaded(true);
        }
    }, []);

    // Gem til localStorage når listen ændres
    useEffect(() => {
        // Gem kun hvis data er indlæst
        if (isLoaded) {
            try {
                localStorage.setItem("wishlist", JSON.stringify(wishlist));
            } catch (err) {
                console.error("Kunne ikke gemme wishlist:", err);
            }
        }
    }, [wishlist, isLoaded]);

    const addToWishlist = (movie) => {
        setWishlist((prev) => {
            const exists = prev.some((m) => m.id === movie.id);
            if (exists) return prev;
            return [...prev, movie];
        });
    };

    const removeFromWishlist = (movieId) => {
        setWishlist((prev) => prev.filter((m) => m.id !== movieId));
    };

    const isInWishlist = (movieId) => {
        return wishlist.some((m) => m.id === movieId);
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
        >
            {children}
        </WishlistContext.Provider>
    );
}

// PropTypes til type-checking
WishlistProvider.propTypes = {
    children: PropTypes.node.isRequired
};

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (context === undefined) {
        throw new Error('useWishlist skal bruges inden for en WishlistProvider');
    }
    return context;
}