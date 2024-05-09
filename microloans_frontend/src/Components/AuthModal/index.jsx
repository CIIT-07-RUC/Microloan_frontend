import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';


function AuthModal (props) {

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
              <Form>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="phone"
                    placeholder="50123201"
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>

              </Form>
            </Modal.Body>
          </Tab>
          <Tab eventKey="login" title="Login">
          <Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    autoFocus
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder=""
                    autoFocus
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
          </Tab>
        </Tabs>
       
        <Modal.Footer>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
export default AuthModal;