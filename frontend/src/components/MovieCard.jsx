import '../css/MovieCard.css'
import { useMovieContext } from '../context/MovieContext'

function MovieCard({ movie }) {
    const { addFavorite, removeFavorite, isFavorite } = useMovieContext();
    const favorite = isFavorite(movie.id);

    function handleFavoriteClick(e) {
        e.preventDefault();
        if (favorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
    }

    const posterUrl = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : (movie.url || '');

    const releaseYear = (movie.release_date || movie.releaseDate || '').split('-')[0];

    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={posterUrl} alt={movie.title} />
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? 'active' : ''}`} 
                        onClick={handleFavoriteClick}
                    >
                        ♥
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3>{movie.title}</h3>
                <p>{releaseYear}</p>
            </div>
        </div>
    );
}

export default MovieCard;
