import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import axios from "axios";
import RichTextEditor from "react-rte";
import RTEditor from "../RTEditor";

export default function SignUp(props) {
  const [id, setId] = useState(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [bioDescription, setBioDescription] = useState(
    RichTextEditor.createEmptyValue()
  );
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    axios
      .get("/api/userinfo")
      .then(res => {
        setId(res.data._id);
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setEmail(res.data.email);
        setBioDescription(
          RichTextEditor.createValueFromString(res.data.bioDescription, "html")
        );
        setUsername(res.data.username);
        setPassword(res.data.password);
        setConfirmPassword(res.data.password);
      })
      .catch(err => {
        console.log("err", err);
      });
  }, []);

  function onchangeRTEditor(value) {
    setBioDescription(value);
  }
  const { history } = props;
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
                setFirstName(event.target.value);
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
                setLastName(event.target.value);
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
                setEmail(event.target.value);
              }}
              placeholder="Email"
            />
          </FormGroup>
          <FormGroup>
            <Label>Bio Description</Label>
            <RTEditor value={bioDescription} onChangeRTE={onchangeRTEditor} />
          </FormGroup>
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
                setPassword(event.target.value);
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
                setConfirmPassword(event.target.value);
              }}
              placeholder="confirm password"
            />
          </FormGroup>
          <Button
            color="info"
            onClick={() => {
              if (!id) {
                axios
                  .post("/api/users", {
                    firstName,
                    lastName,
                    email,
                    bioDescription: bioDescription.toString("html"),
                    username,
                    password
                  })
                  .then(response => {
                    console.log("response", response);
                    localStorage.setItem("token", response.data.token);
                    history.push("/");
                  })
                  .catch(err => {
                    console.log("err", err);
                  });
              } else {
                axios
                  .post(`/api/users/${id}`, {
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
              }
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
