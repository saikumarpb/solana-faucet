import React from 'react';
import './Header.css';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import SolanaLogo from 'jsx:./assets/SolanaLogo.svg';

function Header() {
  return (
    <Navbar expand="lg" className="header p-4" sticky="top">
      <Container className=" d-flex justify-content-center">
        <Navbar.Brand href="#home"></Navbar.Brand>
      </Container>
    </Navbar>
  );
}

export default Header;
