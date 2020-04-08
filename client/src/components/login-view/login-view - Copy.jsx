import React, { useState } from "react";
import PropTypes from "prop-types";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const register = "true";

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    /*send a request to the server for authentication*/
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(register);
    /*send a request to the server for authentication*/
  };

  return (
    <Container className="loginContainer">
      <h1>Welcome to My Flix</h1>
      <Form>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button id="loginButton" onClick={handleSubmit}>
          Log in
        </Button>

        <Form.Group>
          <Form.Text>
            New User?
            <Button id="registerButton" onClick={handleRegister}>
              SignUp
            </Button>
          </Form.Text>
        </Form.Group>
      </Form>
    </Container>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired,
};
