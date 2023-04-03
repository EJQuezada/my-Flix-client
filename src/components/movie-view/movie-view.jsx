import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    console.log(movieId, movies);
    const movie = movies.find((m) => m.id === movieId);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
    const [favoriteMovies, setFavoriteMovies] = useState(
        user.favoriteMovies ? user.FavoriteMovies: []
    );
    const [isFavorite, setIsFavorite] = useState(false);

    const addFavorite = () => {
        fetch(
            `https://edgars-movie-api.onrender.com/users/${user.Username}/movies/${movieId}`, 
            {
                method: "POST",
                headers: {Authorization: `Bearer ${token}`},
            }
        )
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("failed");
                    return false;
                }
            })
            .then(user => {
                if (user) {
                    alert("Successfully added to favorites");
                    setFavoriteMovies(user.FavoriteMovies);
                    setIsFavorite(true);
                    localStorage.setItem("user", JSON.stringify(user));
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    const removeFavorite = () => {
        fetch(
            `https://edgars-movie-api.onrender.com/users/${user.Username}/movies/${movieId}`, 
            {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
            }
        )
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                alert("Failed");
                return false;
            }
        })
        .then(user => {
            if (user) {
                alert("Successfully deleted from favorite movies");
                setFavoriteMovies(user.FavoriteMovies);
                setIsFavorite(false);
                localStorage.setItem("user", JSON.stringify(user));
            }
        })
        .catch((e) => {
            alert(e);
        });
    };

    const toggleMovie = () => {
        const favoriteMoviesValues = Object.values(favoriteMovies);
        favoriteMoviesValues.some((favM) => favM === movie._id)
            ? setIsFavorite(true)
            : setFavoriteMovies(false);
    };

    useEffect(() => {
        toggleMovie();
    }, []);

    console.log(movie);

    return (
        <>
            <Col md={12}>
                <div className="text-light">
                    <img 
                        className="w-100" 
                        src="https://m.media-amazon.com/images/M/MV5BMjAyNTU5OTcxOV5BMl5BanBnXkFtZTcwMDEyNjM2MQ@@._V1_QL75_UY281_CR6,0,190,281_.jpg" 
                        alt="Movie Cover Image" 
                    />
                    <h2>
                        {movie.title} ({movie.year})
                    </h2>
                    <p>{movie.description}</p>
                    <h3>Actors:</h3>
                    <h5>{movie.Actors.join(" - ")}</h5>
                    <h3>Genre:</h3>
                    <h5>{movie.Genre.Name}</h5>
                    <p>{movie.Genre.Description}</p>
                    <h3>Director: </h3>
                    <h5>
                        {movie.Director.Name} 
                        {movie.Director.Birth}
                    </h5>
                    <p>{movie.Director.Bio}</p>
                    <Link to={"/"}>
                        <Button variant="primary">Back</Button>
                    </Link>
                    {isFavorite ? (
                        <Button 
                            variant="danger" 
                            className="ms-2" 
                            onClick={removeFavorite}
                        >
                            Remove from favorites
                        </Button>
                    ) : ( 
                        <Button 
                            variant="success" 
                            className="ms-2" 
                            onClick={addFavorite}
                        >
                            Add to favorites
                        </Button>
                    )}
                </div>
            </Col>
        </>
    );
};

MovieView.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            title: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
            genre: PropTypes.string.isRequired,
            director: PropTypes.string.isRequired,
            image: PropTypes.string.isRequired
        }).isRequired
    ),
};