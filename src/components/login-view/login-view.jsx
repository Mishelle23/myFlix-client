import React, { useState } from 'react';
import PropTypes from "prop-types";
import { Form, Button, Card, Container, Col, Row } from 'react-bootstrap/Button';

import './login-view.scss';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
    /* Send a request to the server for authentication */
    /* then call props.onLoggedIn(username) */
  };

  return (
    <Container fluid className="loginContainer">
      <Row>
        <Col>
          <Card className="loginCard">
            <Card.Body>
              <Card.Title className="text-centre">Your Login</Card.Title>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    onChange={e => setUsername(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                  Submit
                </Button>
                <Button>Register</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }),
  onLoggedIn: PropTypes.func.isRequired,
};