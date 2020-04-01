import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: "", password: "" };
  }

  render() {
    const { username, password } = this.state;
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
            <Button color="info">SignIn</Button>
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
