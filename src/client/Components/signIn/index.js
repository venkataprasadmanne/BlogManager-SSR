import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

export default function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { history } = props;

  return (
    <Row>
      <Col>
        <br />
        <Form>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={event => {
                setUsername(event.target.value);
              }}
              placeholder="username"
              use
            />
          </FormGroup>
          <FormGroup>
            <Label>Password</Label>
            <Input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={event => {
                setPassword(event.target.value);
              }}
              placeholder="password"
            />
          </FormGroup>
          <Button
            onClick={() => {
              axios
                .post("/login", { username, password })
                .then(res => {
                  localStorage.setItem("token", res.data.token);
                  history.push("/");
                })
                .catch(err => {
                  localStorage.setItem("token", "");
                });
            }}
            color="info"
          >
            SignIn
          </Button>
          <br />
        </Form>
        <span>new user ? </span>
        <NavLink to="/signup">SignUp</NavLink>
      </Col>
    </Row>
  );
}
