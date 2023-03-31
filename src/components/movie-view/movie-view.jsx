import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./movie-view.scss";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
    const movie = movies.find((m) => m.id === movieId);

    const [isFavorite, setIsFavorite] = useState(user.favoriteMovies.includes(movie.id));

    useEffect(() => {
        setIsFavorite(user.favoriteMovies.includes(movie.id));
    }, [movieId])

    const addFavorite = () => {
        fetch(`https://edgars-movie-api.onrender.com/users/${user.username}/movies/${movieId}`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`}
        })
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
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    const removeFavorite = () => {
        fetch(`https://edgars-movie-api.onrender.com/users/${user.username}/movies/${movieId}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` }
        })
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
                updateUser(user);
            }
        })
        .catch(e => {
            alert(e);
        });
    }

    return (
        <>
        
        <Col md={12}>
            <div className="text-light">
                <img className="w-100" src={movie.image} alt="Movie Cover Image" />
                <h2>{movie.title} ({movie.year})</h2>
                <p>{movie.description}</p>
                <h3>Actors:</h3>
                <h5>{movie.actors.join(" - ")}</h5>
                <h3>Genre:</h3>
                <h5>{movie.genre}</h5>
                <p>{movie.genredescription}</p>
                <h3>Director: </h3>
                <h5>{movie.director} ({movie.directorbirth.slice(0, 10)}: "")</h5>
                <p>{movie.directorbio}</p>
                <Link to={"/"}>
                    <Button variant="primary">Back</Button>
                </Link>
                {isFavorite ?
                    <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                    : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                }
            </div>
        </Col>
        </>
    );
};

MovieView.propTypes = {
    movies: Prop.Types.arrayOf(propTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        genre: PropTypes.string.isRequired,
        director: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired
    }).isRequired)
};