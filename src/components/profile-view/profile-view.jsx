import { useEffect, useState } from "react";
import { Card, Container, Col, Row, Button, Form } from "react-bootstrap";
import "./profile-view.scss";

export const ProfileView = ({ movies, onUpdatedUserInfo }) => {
    
    const [updatedUser, setUpdatedUser] = useState(false); 
    const favoriteMovieList = movies.filter((movie) => storedUser.FavoriteMovies.includes(movie.id));
    console.log ("movies profile view", favoriteMovies);
    const storedUser = JSON.parse(localStorage.getItem("user"))
    
    //handle for updating user info
    const handleUpdate = (e) => {
        e.preventDefault();
        const data={};
            if (username !== storedUser.Username) data.Username = username;
            if (password) data.Password = password;
            if (email !== storedUser.Email) data.Email = email;
            if (birthday !== storedUser.Birthday) data.Birthday = birthday;
        
        console.log(data);

        fetch("https://edgars-movie-api.onrender.com/users/${storedUser.Username}", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        }).then((response)=>response.json())
        .then((data)=>{
            console.log(data);
            localStorage.setItem("user", JSON.stringify(data.user));
            alert("Update successful, please login again!");
            localStorage.clear();
            window.location.reload();
        }).catch((e)=>{
            alert("Something went wrong!");
            console.log(e);
        })
    };

    //handle for deleting a user/unregistering
    const handleDeregister = () => {
        fetch("https://edgars-movie-api.onrender.com/users/${storedUser.Username}", {
            method: "DELETE",
            headers: {
                Authorization: "Bearer ${token}",
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if (response.ok) {
                localStorage.clear();
                alert("Account was successfully deleted");
                <Navigate to="/signup" />
            }
            else {
                alert("Delete request failed!")
                window.location.reload();
            }
        }).catch((e)=>{
            alert("Something went wrong")
            window.location.reload();
            console.log(e);
        })
    };

    useEffect (() => {
        if (birthdayInputRef.current) {
            birthdayInputRef.current.value = formatDate(birthday);
        }
    }, [updatedUser]);

    return(
        <Container>
            <Row className="mb-4" style={{marginTop: 60}}>
                <Col xs={12} sm={8} md={6} lg={4}>
                    <Card style={{marginTop: 30, backgroundColor: "whitesmoke"}}>
                        <Card.Body>
                            <UserInfo username={storedUser.Username} email={storedUser.Email} birthday={storedUser.Birthday} handleDeregister={handleDeregister} />
    
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            <Row>
                <Col>
                    <Button variant="secondary" size="sm" onClick={handleToggleForm}>{showForm ? "Close" : "edit info"} </Button>
                </Col>
            </Row>

            <Row>
                <Col>
                    {showForm && (

                        <Card style={{marginTop: 30, backgroundColor: "whitesmoke", marginBottom: 30}}>
                            <Card.Body>
                                <Card.Title>Edit User Information</Card.Title>
                                    <Form className="w-100" onSubmit={handleUpdate}>
                                    <Form.Group controlId="updateFormUsername">
                                        <Form.Label style={{ marginTop: 10 }}>Username: </Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={username}
                                            onChange={event => setUsername(event.target.value)}
                                            minLength="5"
                                            placeholder="Please enter username (min 5 characters)"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="updatePassword">
                                        <Form.Label style={{ marginTop: 15 }}>Password: <span className="required" style={{color: "red"}}>*</span></Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            onChange={event => setPassword(event.target.value)}
                                            placeholder="password"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="updateFormEmail">
                                        <Form.Label style={{ marginTop: 15 }}>Email: </Form.Label>
                                        <Form.Control
                                            type="email"
                                            value={email}
                                            onChange={event => setEmail(event.target.value)}
                                            placeholder="Enter your email"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="updateFormBirthday">
                                        <Form.Label style={{ marginTop: 15 }}>Birthday: </Form.Label>
                                        <Form.Control
                                            type="date"
                                            value={moment(birthday).format("MM-DD-YYYY")}
                                            onChange={event => setBirthday(event.target.value)}
                                        />
                                    </Form.Group>

                                    <Button variant="secondary" type="submit" style={{marginTop: 20, marginBottom: 20}}>
                                        Save Changes
                                    </Button>

                                    <Form.Text className="required" style={{color: red}}>
                                        <p> <span >*</span> Required Field </p>
                                    </Form.Text>

                                    </Form>

                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>

            <>
                <Row style={{marginTop: 100}}>
                    {favMovies.length === 0 ? (
                        <h4>You haven't added any movies!</h4>
                    ) : (
                    <>
                        <h4>Favorite Movies</h4>
                        {favMovies.map((movie) =>(
                            <Col xs={12} sm={10} md={8} lg={4} key={movie.id} className="mb-4" >
                                <MovieCard
                                    movie={movie}
                                />
                            </Col>
                        ))}
                    </>
                    )}
                </Row>
            </>
        </Container>       
    );
};
