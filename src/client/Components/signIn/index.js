import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  render() {
    const { username, password } = this.state;
    const {history} = this.props;
    console.log("this.state", this.state);
    const that = this;
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
                  that.setState({ username: event.target.value });
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
                  that.setState({ password: event.target.value });
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
}

export default SignIn;
