import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import axios from "axios";
import RichTextEditor from "react-rte";
import { useSelector, useDispatch } from "react-redux";
import RTEditor from "../RTEditor";
import { signUp, SIGN_UP_MOUNT, SIGN_UP_UNMOUNT } from "../../Redux/actions";

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

  const dispatch = useDispatch();
  const propsFromStore = useSelector(state => {
    return {
      id: state.user.data.id,
      firstName: state.user.data.firstName,
      lastName: state.user.data.lastName,
      email: state.user.data.email,
      bioDescription: state.user.data.bioDescription,
      username: state.user.data.username,
      password: state.user.data.password,
      token: state.user.token,
      loading: true,
      mount: state.user.mount
    };
  });

  /* setId(propsFromStore.id);
  setFirstName(propsFromStore.firstName);
  setLastName(propsFromStore.lastName);
  setEmail(propsFromStore.email);
  setBioDescription(
    RichTextEditor.createValueFromString(propsFromStore.bioDescription, "html")
  );
  setUsername(propsFromStore.username);
  setPassword(propsFromStore.password);
  setConfirmPassword(propsFromStore.password); */

  useEffect(() => {
    axios
      .get("/api/userinfo")
      .then(res => {
        console.log("userinfo res", res);
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
        /* dispatch({
          type: SIGN_UP_MOUNT,
          data: res.data,
          token: res.data.token
        }); */
      })
      .catch(err => {
        console.log("err", err);
      });
    return () => {
      dispatch({ type: SIGN_UP_UNMOUNT });
    };
  }, []);

  const { history } = props;
  useEffect(() => {
    if (propsFromStore.token && propsFromStore.loading) {
      localStorage.setItem("token", propsFromStore.token);
      history.push("/");
    }
  }, [propsFromStore.token, propsFromStore.loading]);

  function onchangeRTEditor(value) {
    setBioDescription(value);
  }
  return (
    <Container>
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
                signUp({
                  id,
                  firstName,
                  lastName,
                  email,
                  bioDescription,
                  username,
                  password
                })(dispatch);
              }}
            >
              SignUp
            </Button>
            <br />
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
