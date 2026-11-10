# 🎬 CineVerse — React Movie Discovery & Favorites Platform

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![React Router](https://img.shields.io/badge/React_Router-7-CA4245?logo=react-router&logoColor=white)](https://reactrouter.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A responsive, high-performance Movie Discovery and Curation Single Page Application (SPA) built with **React 19**, **Vite**, and **React Router v7**. Integrated with **The Movie Database (TMDB) REST API**, featuring real-time search, asynchronous data hydration, and persistent client-side state management via React's Context API and Browser `localStorage`.

---

## ✨ Features

- **🔥 Popular Movies Feed**: Automatically fetches and showcases trending and popular films on mount with loading and error boundaries.
- **🔍 Real-Time Search**: Allows users to dynamically query TMDB's catalog with input validation, whitespace trimming, and error feedback.
- **❤️ Favorites System & State Persistence**:
  - Add or remove movies to/from a personal favorites collection with single-click toggle.
  - Global state managed via custom React Context (`MovieContext`) and custom hook (`useMovieContext`).
  - Persistent across page refreshes and browser sessions using synchronous `localStorage` hydration.
- **🎨 Responsive Netflix-Style UI**:
  - Dynamic CSS Grid layout adapting seamlessly across mobile, tablet, and ultra-wide screens.
  - Hover overlays with poster scaling and interactive favorite actions.
  - Dedicated empty-state screens for zero-search results and empty favorites.
- **🔐 Secure Secret Handling**: Environment-based API key management using Vite's `import.meta.env` system, preventing credential leakage in source control.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | **React 19** | Functional components, custom hooks, and modern concurrent features |
| **Build Tool & Bundler** | **Vite 8** | Lightning-fast HMR and optimized production bundling with Rolldown |
| **Routing** | **React Router DOM v7** | Client-side declarative routing (`/` Home, `/favorites` Favorites) |
| **State Management** | **React Context API** | Centralized global favorites state without third-party boilerplate |
| **Data Fetching** | **Native Fetch API** | Asynchronous service layer communicating with TMDB REST endpoints |
| **Styling** | **Custom CSS3** | Modular CSS using Flexbox, CSS Grid, CSS Variables, and animations |
| **Persistence** | **Browser LocalStorage** | Synchronous client-side state persistence across browser restarts |

---

## 📂 Project Structure

```text
React/
├── README.md                      # Project documentation and CV portfolio guide
├── .gitignore                     # Root-level ignore rules for node_modules and secrets
└── frontend/
    ├── .env.example               # Template for environment variables (safe for Git)
    ├── .gitignore                 # Frontend ignore rules (excludes .env and dist)
    ├── index.html                 # Single page application entry HTML
    ├── package.json               # NPM scripts and project dependencies
    ├── vite.config.js             # Vite configuration and React plugin setup
    └── src/
        ├── App.jsx                # Root application layout with navigation & routes
        ├── main.jsx               # React DOM entry point wrapped in BrowserRouter
        ├── assets/                # Static SVGs, logos, and images
        ├── components/
        │   ├── MovieCard.jsx      # Reusable movie card with poster, details & favorite toggle
        │   └── NavBar.jsx         # Global responsive navigation bar
        ├── context/
        │   └── MovieContext.jsx   # Global Context Provider for favorites with localStorage sync
        ├── css/
        │   ├── App.css            # Global main-content container styling
        │   ├── Favorites.css      # Empty state & favorites grid layout
        │   ├── Home.css           # Search form, loading indicators & responsive grid
        │   ├── index.css          # Global typography, color schemes & reset rules
        │   ├── MovieCard.css      # Card hover animations, overlays & heart toggle button
        │   └── Navbar.css         # Navigation bar flex layout & active link states
        ├── pages/
        │   ├── Home.jsx           # Main catalog feed & search query controller
        │   └── favorites.jsx      # Favorited movies curation view
        └── services/
            └── api.js             # TMDB REST API integration layer (popular & search endpoints)
```

---

## 🧠 Key Technical Decisions & Challenges Solved

### 1. Eliminating `localStorage` Hydration Race Conditions
* **Challenge**: When synchronizing React state with `localStorage`, initializing state with `useState([])` alongside an effect `useEffect(..., [favorites])` caused the empty array to overwrite stored favorites before the asynchronous read effect ran (especially in React StrictMode's dual-mount lifecycle).
* **Solution**: Implemented a **lazy state initializer** in `MovieContext`:
  ```javascript
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = localStorage.getItem("favorites");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  ```
  This loads persisted data **synchronously on the very first render**, guaranteeing zero data loss and no flash of empty content.

### 2. Decoupled Service Architecture
* Network requests are strictly isolated inside `src/services/api.js`. Components consume pure async functions (`getPopularMovies()`, `searchMovies(query)`) rather than managing HTTP logic directly.

### 3. Defensive API Mapping
* The MovieCard component defensively handles TMDB's data shape (constructing full CDN poster paths from `poster_path` and extracting release years from ISO dates), preventing UI crashes on malformed or incomplete records.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (version 18 or higher recommended)
- A free TMDB API key from [The Movie Database (TMDB)](https://www.themoviedb.org/settings/api)

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone <YOUR_REPOSITORY_URL>
   cd React/frontend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Copy the `.env.example` file to create `.env`:
   ```bash
   cp .env.example .env
   ```
   Open `.env` and insert your TMDB API key:
   ```env
   VITE_TMDB_API_KEY=your_actual_tmdb_api_key_here
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Build for production**:
   ```bash
   npm run build
   ```

---

## 💼 How to Showcase This Project on Your CV / Resume

Here are ready-to-use resume bullet points crafted to highlight engineering rigor, problem solving, and modern React practices:

### 📄 Bullet Points for Your CV / Resume:

> **Frontend Developer / React Developer — Movie Discovery & Curation Web App**
> - Architected a responsive movie discovery Single Page Application (SPA) using **React 19**, **Vite**, and **React Router v7**, integrating **TMDB REST API** to support catalog exploration and dynamic search.
> - Implemented centralized global state management using **React Context API** and custom hooks (`useMovieContext`), managing user favorites with zero third-party state library overhead.
> - Designed persistent client-side caching utilizing browser **`localStorage`** with lazy state initialization, eliminating asynchronous mount race conditions and data clobbering in React StrictMode.
> - Built a modular, reusable component hierarchy with defensive data mapping (handling TMDB CDN poster construction, date parsing, and fallbacks for missing assets).
> - Enforced strict frontend security practices by abstracting sensitive API credentials behind Vite environment variables (`import.meta.env`) with dedicated `.gitignore` safeguards.

### 💬 Interview Talking Points:
- **State Management**: *"I chose React Context over Redux because the favorites feature required a lightweight, centralized store without the boilerplate and bundle overhead of heavier state managers."*
- **Strict Mode Lifecycle**: *"I tackled a subtle React 18/19 StrictMode challenge where dual-mount effects risked wiping localStorage, solving it cleanly by moving hydration into a synchronous `useState` callback."*
- **Component Reusability**: *"The `<MovieCard />` component is completely reusable across both the search feed and the favorites collection, dynamically responding to global context to toggle state with instantaneous visual feedback."*

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).
