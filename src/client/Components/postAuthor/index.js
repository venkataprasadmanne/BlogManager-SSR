import React from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";
import RichTextEditor from "react-rte";
import RTEditor from "../RTEditor";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      bioDescription: RichTextEditor.createEmptyValue(),
      username: "",
      password: "",
      confirmPassword: ""
    };
    this.onchangeRTEditor = this.onchangeRTEditor.bind(this);
  }

  componentDidMount() {
    console.log("Article component did mount");
    axios
      .get("/api/userinfo")
      .then(res => {
        console.log("api user response", res);
        const {
          _id,
          firstName,
          lastName,
          email,
          bioDescription,
          username,
          password
        } = res.data;
        const bioDescriptionValue = RichTextEditor.createValueFromString(
          bioDescription,
          "html"
        );

        console.log("bioDescriptioValue", bioDescriptionValue);
        console.log("bioDescription", bioDescription);
        const confirmPassword = password;
        this.setState({
          _id,
          firstName,
          lastName,
          email,
          bioDescription: bioDescriptionValue,
          username,
          password,
          confirmPassword
        });
      })
      .catch(err => {
        console.log("err", err);
      });
  }

  onchangeRTEditor(value) {
    this.setState({ bioDescription: value});
  }

  render() {
    console.log("this.state", this.state);
    const { history } = this.props;
    const that = this;
    const {
      _id,
      firstName,
      lastName,
      email,
      bioDescription,
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
              <Label>Bio Description</Label>
              <RTEditor
                onChangeRTE={this.onchangeRTEditor}
                value={bioDescription}
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
                  .post(`/api/users/${_id}`, {
                    data: {
                      firstName,
                      lastName,
                      email,
                      bioDescription: bioDescription.toString("html"),
                      username,
                      password
                    }
                  })
                  .then(response => {
                    console.log("response", response);
                    localStorage.setItem("token", response.data.token);
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

export default Settings;
