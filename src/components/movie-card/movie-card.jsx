import React from "react";
import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";
//import {Link} from react-router-dom;

//import "./movie-view/movie-view.jsx";

export const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
    const handleFavoriteClick = (event) => {
        event.preventDefault();
        toggleFavorite(movie);
    };
    
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.image} />
            <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>{movie.description}</Card.Text>
                <Link to ={`/movies/${encodeURIComponent(movie.id)}`}>
                    <Button variant="link">
                    Open
                    </Button>   
                </Link>

                <Button
                    variant="link"
                    classname="text-light"
                    onClick={handleFavoriteClick}
                >
                </Button>
            </Card.Body>
        </Card>
    );
};

MovieCard.propTypes = {
    movie: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.shape({
            name: PropTypes.string.isRequired,
            description: PropTypes.string.isRequired,
        }).isRequired,
        director: PropTypes.shape({
            name: PropTypes.string.isRequired, 
            bio: PropTypes.string.isRequired,
            birthYear: PropTypes.string,
            deathYear: PropTypes.string,
        }).isRequired,
    }).isRequired, 
    isFavorite: PropTypes.bool.isRequired,
    toggleFavorite: PropTypes.func.isRequired,
};

export default MovieCard;