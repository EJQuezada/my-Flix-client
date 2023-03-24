import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    const [user, setUser] = useState(storedUser? storedUser : null);
    const [token, setToken] = useState(storedToken? storedToken: null);
    const [movies, setMovies] = useState([
    //    {
    //        id: 1, 
    //        title: "12 Angry Men",
    //        image: "https://media.gettyimages.com/id/514369623/de/foto/a-poster-for-sidney-lumets-1957-drama-12-angry-men-starring-henry-fonda.jpg?s=612x612&w=gi&k=20&c=9C9PJOVqYbIcskceqRX9Q60X9CQeuI_m2aV3hoplVjI=",
    //        description: "An adaptation of the classic 1957 drama. A gripping look at the jury's deliberations on a murder case in which a conviction would mean a young man's death penalty. During the deliberations, an impartial jury uncovers enough gaps in the prosecution's argument to raise justifiable doubts.",
    //        genre: ["Crime", "Drama"],
    //        director: "Sidney Lumet",
    //        actors: ["Henry Fonda", "Lee Cobb", "Martin Balsam"],
    //        release: "1957"
    //    },
    //    {
    //        id: 2, 
    //        title: "12 Monkeys",
    //        image: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.themoviedb.org%2Fmovie%2F63-twelve-monkeys%2Fimages%2Fposters&psig=AOvVaw0PswpIqqGbmSpMwqmbdRuf&ust=1678293489043000&source=images&cd=vfe&ved=0CA8QjRxqFwoTCJDV18qgyv0CFQAAAAAdAAAAABAE",
    //        description: "In a future world devastated by disease, a convict is sent back in time to gather information about the man-made virus that wiped out most of the human population on the planet.",
    //        genre: ["Mystery", "Sci-Fi", "Thriller"],
    //        director: "Terry Gilliam",
    //        actors: ["Bruce Willis", "Madeleine Stowe", "Brad Pitt"],
    //        release: "1995"
    //    },
    //    {
    //        id: 3, 
    //        title: "21",
    //        image: "https://www.pastposters.com/cw3/assets/product_full/R/21-cinema-quad-movie-poster-(1).jpg",
    //        description: "Inspired by real events and people, 21 is about six MIT students who become trained to be experts in card counting in Black Jack and subsequently took Vegas casinos for millions in winnings.",
    //        genre: ["Crime", "Drama", "History"],
    //        director: "Robert Luketic",
    //        actors: ["Jim Sturgess", "Kate Bosworth", "Kevin Spacey", "Aaron Yoo", "Liza Lapira", "Jacob Pitts", "Laurence Fishburne", "Jack McGee", "Josh Gad", "Sam Golzari", "Helen Carey", "Jack Gilpin", "Donna Lows"],
    //        release: "2008",
    //    },
    //    {
    //        id: 4, 
    //        title: "21 Jump Street",
    //        image: "https://m.media-amazon.com/images/M/MV5BNTZjNzRjMTMtZDMzNy00Y2ZjLTg0OTAtZjVhNzYyZmJjOTljXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    //        description: "A pair of underachieving cops are sent back to a local high school to blend in and bring down a synthetic drug ring.",
    //        genre: ["Crime", "Comedy", "Action"],
    //        director: "Christopher Miller",
    //        actors: ["Jonah Hill", "Channing Tatum", "Ice Cube", "Brie Larson", "Dave Franco", "Rob Riggle", "DeRay Davis", "Dax Flame", "Chris Parnell", "Ellie Kemper", "Jake Johnson", "Nick Offerman", "Holly Robinson Peete", "Johnny Pemberton", "Stanley Wong"],
    //        release: "2012",
    //    },
    //    {
    //        id: 5, 
    //        title: "40 Year Old Virgin",
    //        image: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRrR290Lef_IoPLgw10i5698Ynb9180AlD4rgjwcQx4O9oImvR1",
    //        description: "Goaded by his buddies, a nerdy guy who's never 'done the deed' only finds the pressure mounting when he meets a single mother.",
    //        genre: ["Comedy", "Romance"],
    //        director: "Judd Apatow",
    //        actors: ["Steve Carell", "Catherine Keener", "Paul Rudd", "Romany Malco", "Seth Rogen", "Elizabeth Banks", "Leslie Mann", "Jane Lynch", "Gerry Bednob", "Shelley Malil", "Kat Dennings", "Jordan Masterson", "Chelsea Smith", "Jonah Hill", "Erica Vittina Phillips", "Amy Kaling", "Mo Collins"],
    //        release: "2005",
    //    }
    ]);
    //const [selectedMovie, setSelectedMovie] = useState(storedUser? storedUser : null);

    useEffect(() => {
        if (!token) return;

        fetch("https://edgars-movie-api.onrender.com/movies", {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => response.json())
            .then((data) => {
                const moviesFromApi = data.map((doc) => {
                    return {
                        id: doc._id,
                        title: doc.Title,
                        image: `https://m.media-amazon.com/images/M/MV5BMjAyNTU5OTcxOV5BMl5BanBnXkFtZTcwMDEyNjM2MQ@@._V1_QL75_UY281_CR6,0,190,281_.jpg` , 
                    };
                });

            setMovies(moviesFromApi);
        });
    }, [token]);

    return (
        <BrowserRouter>
            <Row className="justify-content-md-center">
                <Routes>
                    <Route
                        path="/signup"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user, token) => {setUser(user); setToken(token)}} />
                                        or
                                        <SignupView />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <>
                                {user ? (
                                    <Navigate to="/" />
                                ) : (
                                    <Col md={5}>
                                        <LoginView onLoggedIn={(user) => setUser(user)} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/movies/:movieId"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <Col md={8}>
                                        <MovieView movies={movies} />
                                    </Col>
                                )}
                            </>
                        }
                    />
                    <Route
                        path="/"
                        element={
                            <>
                                {!user ? (
                                    <Navigate to="/login" replace />
                                ) : movies.length === 0 ? (
                                    <Col>The list is empty!</Col>
                                ) : (
                                    <>
                                    {movies.map((movie) => (
                                        <Col className="mb-4" key={movie.id} md={3}>
                                            <MovieCard movie={movie} />
                                        </Col>
                                    ))}
                                    </>
                                )}
                            </>
                        }
                    />
                </Routes>
            </Row>
        </BrowserRouter>
    );
};
