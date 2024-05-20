import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.scss';
import { useState } from 'react';
import AuthModal from '../AuthModal';
import { useContext } from 'react';
import { ThemeContext } from '../../index';

export function NavigationMain(props) {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);

  const [defaultKey, setDefaultKey] = useState('register');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (key) => { 
    setShow(true)
    setDefaultKey(key);
    console.log("KEYYY", key)
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="navigation__wrapper">
      <Container>
        <Navbar.Brand href="#home">PocketLoan Denmark</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#communications">Communications</Nav.Link>
            <NavDropdown title="Loans" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="browseLoansPage">
                See all loans
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Create loan
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          { !isUserLoggedIn ?
          <Nav>
            {}
            <Nav.Link className='nav-link-button' onClick={() => handleShow('register')}>Get started</Nav.Link>
            <Nav.Link className='nav-link-button' onClick={() => handleShow('login')}   href="#">
              Login
            </Nav.Link>
          </Nav>
           : null}
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <AuthModal show={show} handleClose={handleClose} handleShow={handleShow} defaultKey={defaultKey} />
    </>
  );
}
