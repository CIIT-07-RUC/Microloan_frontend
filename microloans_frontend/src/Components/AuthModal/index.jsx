import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { UsersAPI } from '../../Apis/UserAPI';
import Alert from 'react-bootstrap/Alert';
import { ThemeContext } from '../../index';

function AuthModal (props) {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(ThemeContext);

  // Register
  const [regEmail, setRegEmail] = useState('');
  const [isInvestor, setIsInvestor] = useState(null);
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(null);
  const [registerErrMessage, setRegisterErrMessage] = useState('');

  // Login
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [isLoginSuccessful, setIsLoginSuccessful] = useState(null);
  const [loginErrMessage, setLoginErrMessage] = useState('');

  async function verifyLogin(e) {
    e.preventDefault();
    if (loginEmail === '' || loginEmail === null || loginPassword === '' || loginPassword === null) {
      setIsLoginSuccessful(false);
      setLoginErrMessage('fields are not valid')
      return;
    }
    await UsersAPI.login(loginEmail, loginPassword)
    .then((data) => {
      sessionStorage.setItem('token', data.token);
      setIsLoginSuccessful(true);
      setIsUserLoggedIn(true);
    })
    .catch((err) => {
      setIsLoginSuccessful(false);
      setIsUserLoggedIn(false);
      console.log("err.response.data", err.response.data.responseMessage)
      setLoginErrMessage(err.response.data.responseMessage);
    })
  }

  async function verifyRegister(e) {
    if (isInvestor === '' || isInvestor === null) {
      return;
    }
    e.preventDefault();

    await UsersAPI.register(regEmail, regPhone, regPassword, regConfirmPassword, JSON.parse(isInvestor))
    .then((data) => {
      setIsRegisterSuccessful(true);
    })
    .catch((err) => {
      console.warn("err", err);
      setIsRegisterSuccessful(false);
      console.log("err.response.data", err.response.data)
      setRegisterErrMessage(err.response.data.title);
    })
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center'}}></Modal.Title>
        </Modal.Header>
          <Tabs
          defaultActiveKey={props.defaultKey}
          id="fill-tab-example"
          className="mb-3"
          fill>
          <Tab eventKey="register" title="Register">
            <Modal.Body>
              <Form onSubmit={verifyRegister}>
              <Form.Select onChange={e => setIsInvestor(e.target.value)} style={{marginBottom: '20px'}} aria-label="Select your role">
                <option>Open this select menu</option>
                <option value="false">Borrower</option>
                <option value="true">Investor</option>
              </Form.Select>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={e => setRegEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="phone"
                    onChange={e => setRegPhone(e.target.value)}
                    placeholder="50123201"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => setRegPassword(e.target.value)}
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    onChange={e => setRegConfirmPassword(e.target.value)}
                    autoFocus
                  />
                </Form.Group>
                <Button variant="primary" type='submit'>
                  Save Changes
                </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              { isRegisterSuccessful === false ? 
               <Alert style={{width: '100%', textAlign: 'center'}} variant='danger'>
                {registerErrMessage}
              </Alert>
               :
               null 
               }
               { 
               isLoginSuccessful === true ? 
               <Alert style={{width: '100%', textAlign: 'center'}} variant='success'>
                 Succesfully registered
               </Alert>
               : null
               }
            </Modal.Footer>

          </Tab>
          <Tab eventKey="login" title="Login">
          <Modal.Body>
              <Form onSubmit={verifyLogin}>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    onChange={e => setLoginEmail(e.target.value)}
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => setLoginPassword(e.target.value)}
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                Save Changes
              </Button>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              { isLoginSuccessful === false ? 
               <Alert style={{width: '100%', textAlign: 'center'}} variant='danger'>
                {loginErrMessage}
              </Alert>
              :
              null 
              }
              { 
              isLoginSuccessful === true ? 
              <Alert style={{width: '100%', textAlign: 'center'}} variant='success'>
                Succesfully logged in   
              </Alert>
              : null
              }
            </Modal.Footer>
           
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
}
export default AuthModal;