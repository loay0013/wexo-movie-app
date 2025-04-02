const API_KEY = "32d5af4bdaec0f8c4d6654ee53924348";
const BASE_URL = "https://api.themoviedb.org/3";
const LANGUAGE = "da-DK";

// Hent alle genrer
export async function fetchGenres() {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE}`);
    const data = await res.json();
    return data.genres;
}

// Hent film fra en bestemt genre
export async function fetchMoviesByGenre(genreId, page = 4) {
    const res = await fetch(`${BASE_URL}/discover/movie?api_key=${API_KEY}&language=${LANGUAGE}&with_genres=${genreId}&page=${page}`);
    const data = await res.json();
    return data;
}

// Hent detaljer om én film
export async function fetchMovieDetails(movieId) {
    const res = await fetch(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}&append_to_response=videos,credits`);
    const data = await res.json();
    return data;
}
// Hent Similar film
export async function fetchSimilarMovies(movieId) {
    const res = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}&language=da-DK`);
    const data = await res.json();
    return data.results;
}
// Hent Film fra søg Input
export async function fetchMoviesByQuery(query) {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}&language=da-DK`
    );
    return await res.json();
}