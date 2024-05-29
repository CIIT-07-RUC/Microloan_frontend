import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.scss';
import { useState, useEffect } from 'react';
import AuthModal from '../AuthModal';
import { useContext } from 'react';
import { ThemeContext } from '../../index';

export function NavigationMain(props) {

  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);
  const { userId } = useContext(ThemeContext);
  const [chatUrl, setChatUrl] = useState('');
  

  useEffect(() => {
      setChatUrl('/chat/' + userId);
   
  }, [userId])
  

  const [defaultKey, setDefaultKey] = useState('register');
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (key) => { 
    setShow(true)
    setDefaultKey(key);
  }

  const handleLogout = () => {
    sessionStorage.removeItem('token'); 
    setIsUserLoggedIn(false);
  }

  return (
    <>
    <Navbar collapseOnSelect expand="lg" className="navigation__wrapper">
      <Container>
        <Navbar.Brand href="/">PocketLoan Denmark</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          <NavDropdown title="Communications" id="collapsible-nav-dropdown">
              <NavDropdown.Item href={chatUrl}>
                Conversation with yourself
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/chat-history">
                Chat history
              </NavDropdown.Item>
          </NavDropdown>

            <Nav.Link href="/users">All users</Nav.Link>
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
           : 
           <Nav>
           <Nav.Link className='nav-link-button' onClick={() => handleLogout()}   href="#">
              Logout
            </Nav.Link>
          </Nav>
           }
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <AuthModal show={show} handleClose={handleClose} handleShow={handleShow} defaultKey={defaultKey} />
    </>
  );
}
