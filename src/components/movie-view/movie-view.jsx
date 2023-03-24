import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movie }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    return (
        <div>
            <div>
                <img className="w-100" src={movie.image} />
            </div>
            <div>
                <span>Title: </span>
                <span> {movie.title}</span>
            </div>
            <div>
                <span>Genre: </span>
                <span> {movie.genre}</span>
            </div>
            <div>
                <span>Release: </span>
                <span>{movie.release}</span>
            </div>
            <Link to={'/'}>
                <button 
                    className="back-button"
                    style={{ cursor: "pointer"}}
                >
                    Back
                </button>
            </Link>
        </div>
    );
};
