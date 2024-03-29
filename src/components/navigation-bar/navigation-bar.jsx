import { Navbar, Container, Nav, Button, Form, FormControl} from "react-bootstrap";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut, searchTerm, setSearchTerm}) => {
    //const [query, setQuery] = useState("");
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    MyFlix Movies App
                </Navbar.Brand>
                <Navbar.Toggle aria-contols="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Form inline className="d-flex">
                                    <FormControl
                                        type="text"
                                        placeholder="Search"
                                        className="mr-sm-2"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    {searchTerm && (
                                        <Button
                                            variant="outline-light"
                                            onClick={() => setSearchTerm('')}
                                        >
                                            X
                                        </Button>
                                    )}
                                </Form>
                            </>
                        )}
                    </Nav>
                    <Nav className="me-auto">
                        {!user && (
                            <>
                                <Nav.Link as={Link} to="/login">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={Link} to="/signup">
                                    Signup
                                </Nav.Link>
                            </>
                        )}
                        {user && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Home
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Nav.Link onClick={onLoggedOut}>
                                    Logout
                                </Nav.Link>
                            </>
                        )}
                    </Nav>    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};




