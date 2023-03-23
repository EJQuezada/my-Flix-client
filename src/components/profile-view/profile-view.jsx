import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import "./profile-view.scss";
import axios from "axios";

export function ProfileView({ movies, onUpdatedUserInfo }) (
    const [user, setUser] = useState({-
    })

    const favoriteMovieList = movies.filter((movies) => (-
    ));

    const getUser = () => {-
    }
    const handleSubmit = (e) => {...
    }
    const removeFav = (id) => {...
    }
    const handleUpdate = (e) => {...
    };

    useEffect (() => {-
    }, [])


    return(
        <div>
            <p>User: (user.Username)</p>
            <p>Email: (user.Email)</p>
            <div>
                <h2>Favorite Movies</h2>
                {favoriteMovieList.map((movies) => {
                    return (
                        <div id=(movies._id)>
                            <img src=(movies.ImagePath) />
                            <Link to=("/movies/$(movies._id)")>
                                <h4>(movies.Title)</h4>
                            </Link>
                            <button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</button>
                        </div>
                    )
                })
                }
            </div>
    )
)