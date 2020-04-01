import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";

class SignUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
    };
  }

  render() {
    console.log("this.state", this.state);
    const { history } = this.props;
    const that = this;
    const {
      firstName,
      lastName,
      email,
      username,
      password,
      confirmPassword
    } = this.state;
    return (
      <Row>
        <Col>
          <br />
          <Form>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={event => {
                  that.setState({ firstName: event.target.value });
                }}
                placeholder="First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Lat Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={event => {
                  that.setState({ lastName: event.target.value });
                }}
                placeholder="Last Name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={event => {
                  that.setState({ email: event.target.value });
                }}
                placeholder="Email"
              />
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                value={username}
                onChange={event => {
                  that.setState({ username: event.target.value });
                }}
                placeholder="username"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="text"
                name="password"
                id="password"
                value={password}
                placeholder="password"
                onChange={event => {
                  that.setState({ password: event.target.value });
                }}
              />
            </FormGroup>
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={event => {
                  that.setState({ confirmPassword: event.target.value });
                }}
                placeholder="confirm password"
              />
            </FormGroup>
            <Button
              color="info"
              onClick={() => {
                axios
                  .post("/api/users", {
                    firstName,
                    lastName,
                    email,
                    username,
                    password
                  })
                  .then(response => {
                    console.log("response", response);
                    history.push("/");
                  })
                  .catch(err => {
                    console.log("err", err);
                  });
              }}
            >
              SignUp
            </Button>
            <br />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SignUp;
