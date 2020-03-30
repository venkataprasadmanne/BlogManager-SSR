import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
                placeholder="password"
              />
            </FormGroup>
            <Button color="info">SignIn</Button>
            <br />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default SignIn;
