import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { UsersAPI } from '../../Apis/UserAPI';
import Alert from 'react-bootstrap/Alert';

function AuthModal (props) {

  // Register
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(null);
  const [loginErrMessage, setLoginErrMessage] = useState('');
  // Login

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  function verifyLogin(e) {
    e.preventDefault();
  }

  async function verifyRegister(e) {
    e.preventDefault();
    await UsersAPI.register(regEmail, regPhone, regPassword, regConfirmPassword)
    .then((data) => {
      console.log("data users func", data)
      setIsLoginSuccessful(true);
    })
    .catch((err) => {
      console.warn("err", err);
      setIsLoginSuccessful(false);
      console.log("err.response.data", err.response.data)
      setLoginErrMessage(err.response.data.title);
    })
  }

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{textAlign: 'center'}}>Authentication</Modal.Title>
        </Modal.Header>
          <Tabs
          defaultActiveKey={props.defaultKey}
          id="fill-tab-example"
          className="mb-3"
          fill>
          <Tab eventKey="register" title="Register">
            <Modal.Body>
              <Form onSubmit={verifyRegister}>
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
              { isLoginSuccessful === false ? 
               <Alert style={{width: '100%', textAlign: 'center'}} variant='danger'>
                {loginErrMessage}
              </Alert>
              :
              null

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
           
          </Tab>
        </Tabs>
      </Modal>
    </>
  );
}
export default AuthModal;