import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import { FaUserCircle } from 'react-icons/fa';
import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header1 = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        const confirmLogout = window.confirm('Are you sure you want to logout?');
        if (confirmLogout) {
            UserService.logout();
            navigate('/');
            window.location.reload(false);
        }
    };

    const isAuthenticated = UserService.isAuthenticated();
    const role = localStorage.getItem('role');

    return (
        <Navbar expand="lg" bg="dark" variant="dark">
            <Container fluid>
                <Navbar.Brand as={Link} to="/">Wijdane Company</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav className="me-auto my-2 my-lg-0" navbarScroll>
                        {isAuthenticated && role === 'ADMIN' && (
                            <>
                                
                                <Nav.Link as={Link} to="/profilePage">Mon profil</Nav.Link>
                                <Nav.Link as={Link} to="/employes">Employés</Nav.Link>
                                <Nav.Link as={Link} to="/departements">Départements</Nav.Link>
                                <Nav.Link as={Link} to="/postes">Postes</Nav.Link>
                                <Nav.Link as={Link} to="/candidats">Candidats</Nav.Link>
                                <Nav.Link as={Link} to="/conges">Congés</Nav.Link>
                            </>
                        )}
                        {isAuthenticated && role === 'EMPLOYE' && (
                            <>
                                <Nav.Link as={Link} to="/profilePage">Mon profil</Nav.Link>
                                <Nav.Link as={Link} to="/employes">Employés</Nav.Link>
                                <Nav.Link as={Link} to="/departements">Départements</Nav.Link>
                                <Nav.Link as={Link} to="/postes">Postes</Nav.Link>
                                
                            </>
                        )}
                        {isAuthenticated && role === 'CANDIDAT' && (
                            <Nav.Link as={Link} to="/postes">Postes</Nav.Link>
                        )}
                        {isAuthenticated && role === 'EMPLOYERH' && (
                            <>
                                <Nav.Link as={Link} to="/profilePage">Mon profil</Nav.Link>
                                <Nav.Link as={Link} to="/employes">Employés</Nav.Link>
                                <Nav.Link as={Link} to="/departements">Départements</Nav.Link>
                                <Nav.Link as={Link} to="/postes">Postes</Nav.Link>
                                <Nav.Link as={Link} to="/candidats">Candidats</Nav.Link>
                                <Nav.Link as={Link} to="/conges">Congés</Nav.Link>
                            </>
                        )}
                    </Nav>
                    {!isAuthenticated && (
                        <Button variant="outline-light" as={Link} to="/login">Login</Button>
                    )}
                    {isAuthenticated && (
                        <Nav>
                            <NavDropdown
                                title={<FaUserCircle size={32} className="text-white" />}
                                id="navbarScrollingDropdown"
                                align="end"
                            >
                                <NavDropdown.Item as={Link} to="/profilePage">View Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    )}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header1;
