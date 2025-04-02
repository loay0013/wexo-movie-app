# 🎬 MovieApp – WEXO Code Challenge

Velkommen til min løsning på WEXO's frontend kodeopgave.  
Appen er bygget med React + Vite og bruger TheMovieDB API til at vise film, genrer og trailers.

---

## 🚀 Funktioner

Forside med horisontalt scrollbare genresektioner (a la Netflix)
Dynamisk data fra TMDB API
Film-detaljeside med trailer, genre, instruktør og skuespillere
Lignende film nederst på detaljesiden
Ønskeliste med tilføj/fjern (gemmes i localStorage)
Søgefunktion med debounce (live-søgning på titler)
Responsivt design med Tailwind CSS

---

## 💻 Teknologier brugt

- React (med Vite)
- Tailwind CSS (utility-first styling)
- Framer Motion (animationer)
- React Router (routing)
- TheMovieDB API
- LocalStorage (for ønskelisten)

---

## ⚙️ Sådan kører du projektet

1. Clone repo:
```bash
git clone https://github.com/loay0013/movieapp-wexo.git

2. Installer dependencies:
npm install

3. start development:
npm run dev 


4.Tilføj din egen TMDB API-nøgle:
Tilføj API-nøglen i api/tmdb.js
const API_KEY = "DIN_API_NØGLE";
