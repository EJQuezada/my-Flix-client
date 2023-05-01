import { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import MovieCard from "../movie-card/movie-card";


export const FavoriteMovies = ({ movies }) => {
    const [favMovies, setFavMovies] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        console.log("From Fav Movies", user, movies)
        setFavMovies(movies.filter(m => user.FavoriteMovies.includes(m._id)));
    }, [])
    return (
        <>
            <h1>Favorite Movies</h1>
            {favMovies.map((movie) => (
                <Col className="mb-4" key={movie._id} md={3}>
                    <MovieCard movie={movie} />
                </Col>
            ))}
        </>
    )
};