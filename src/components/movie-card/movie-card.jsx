import React from "react";
import PropTypes from "prop-types";
import { Button, Card} from "react-bootstrap";
import {Link} from "react-router-dom";

//import "./movie-view/movie-view.jsx";

export const MovieCard = ({ movie }) => {   
    return (
        <Card className="h-100">
            <Card.Img variant="top" src={movie.ImagePath} />
            <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to ={`/movies/${encodeURIComponent(movie._id)}`}>
                    <Button variant="link">Open</Button>   
                </Link>
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