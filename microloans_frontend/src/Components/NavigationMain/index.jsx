import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './index.scss';

export function NavigationMain(props) {
  return (
    <Navbar collapseOnSelect expand="lg" className="navigation__wrapper">
      <Container>
        <Navbar.Brand href="#home">PocketLoan Denmark</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#communications">Communications</Nav.Link>
            <NavDropdown title="Loans" id="collapsible-nav-dropdown">
              <NavDropdown.Item href="#action/3.2">
                See all loans
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Create loan
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link className='nav-link-button' href="#deets">Get started</Nav.Link>
            <Nav.Link className='nav-link-button' eventKey={2} href="#memes">
              Login
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}