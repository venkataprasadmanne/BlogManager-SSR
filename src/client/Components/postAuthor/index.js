import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

class PostAuthor extends React.Component {
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
              <Label>First Name</Label>
              <Input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="First Name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Lat Name</Label>
              <Input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Last Name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Email</Label>
              <Input type="text" name="email" id="email" placeholder="Email" />
            </FormGroup>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="text"
                name="username"
                id="username"
                placeholder="username"
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
            <FormGroup>
              <Label>Confirm Password</Label>
              <Input
                type="text"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="confirm password"
              />
            </FormGroup>
            <Button color="info">SignUp</Button>
            <br />
          </Form>
        </Col>
      </Row>
    );
  }
}

export default PostAuthor;
