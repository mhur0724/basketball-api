import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top" data-bs-theme="dark">
      <Container className='navbar-container'>
        <Navbar.Brand as={NavLink} to="/" end>
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/teams">Teams</Nav.Link>
            <Nav.Link as={NavLink} to="/players">Players</Nav.Link>
            <Nav.Link as={NavLink} to="/favorite-players">Favorite Players</Nav.Link>
            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
