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
// import axios from "axios";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SIGN_IN_UNMOUNT, signIn } from "../../Redux/actions";

export default function SignIn(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { history } = props;
  const dispatch = useDispatch();
  const propsFromState = useSelector(state => {
    return {
      loading: state.signin.loading,
      error: state.signin.error,
      token: state.signin.token
    };
  });

  const { loading, error, token } = propsFromState;
  console.log("propsFromState", propsFromState);

  useEffect(() => {
    if (token) {
      console.log("coming here?");
      localStorage.setItem("token", token);
      history.push("/");
    } else {
      localStorage.setItem("token", "");
    }
  }, [token]);

  return (
    <Container>
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
                signIn(username, password)(dispatch);
                /*
              axios
                .post("/login", { username, password })
                .then(res => {
                  localStorage.setItem("token", res.data.token);
                  history.push("/");
                })
                .catch(err => {
                  localStorage.setItem("token", "");
                }); */
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
    </Container>
  );
}
