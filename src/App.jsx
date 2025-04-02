import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import GenrePage from './pages/GenrePage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import WishlistPage from './pages/WishlistPage'
import Navbar from "./components/Navbar";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/genre/:id" element={<GenrePage />} />
                <Route path="/movie/:id" element={<MovieDetailsPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
            </Routes>
        </>
    )
}

export default App
