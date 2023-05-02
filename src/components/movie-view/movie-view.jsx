import { useEffect, useState } from "react";
import { PropTypes } from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Col, Button } from "react-bootstrap";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m._id === movieId);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");
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
                setIsFavorite(false);
                localStorage.setItem("user", JSON.stringify(user));
            }
        })
        .catch((e) => {
            alert(e);
        });
    };


    useEffect(() => {
        setIsFavorite(user.FavoriteMovies.includes(movie._id))
    }, []);


    return (
        <>
            <Col md={12}>
                <div className="text-dark">
                    <img 
                        className="w-100" 
                        src={movie.ImagePath} 
                        alt="Movie Cover Image" 
                    />
                    <h2>
                        {movie.Title} ({movie.Release})
                    </h2>
                    <p>{movie.Description}</p>
                    <h3>Actors:</h3>
                    <p>{movie.Actors.join(" - ")}</p>
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
                        <Button variant="dark">Back</Button>
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