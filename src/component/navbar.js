import React from 'react';
import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { useCart , AuthProvider, useAuth } from './authcon'; 
import logo from '../image/logo.png';

import { useNavigate } from 'react-router-dom';
const NavigationBar = () => {
  const { getTotalItems } = useCart(); 
  const { currentUser} = useAuth(); 
  const{logout}=AuthProvider();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await logout();
    navigate("/login"); // Redirige vers la page de connexion après la déconnexion
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
      <img src={logo} alt="Logo" style={{ width: '50px', height: '50px', marginRight: '10px' }} />
        <Navbar.Brand href="/">My Market</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Accueil</Nav.Link>
            <Nav.Link href="/products">Tous les produits</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/cart">
              Panier
              {getTotalItems() > 0 && (
                <Badge pill bg="danger" style={{ marginLeft: '10px' }}>
                  {getTotalItems()}
                </Badge>
              )}
            </Nav.Link>
          </Nav>

          <Nav>
      {currentUser ? (
        
        <Nav.Link onClick={handleLogout}>Se déconnecter</Nav.Link>
      ) : (
        
        <>
          <Nav.Link href="/login">Se connecter</Nav.Link>
          <Nav.Link href="/signup">S'inscrire</Nav.Link>
        </>
      )}
    </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;
