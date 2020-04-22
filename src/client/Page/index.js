import React, { useState, useEffect } from "react";
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import App from "../App";
import "./nav.css";

export default function Page(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    axios
      .post("/checktoken")
      .then(res => {
        setIsLoggedin(res.data);
      })
      .catch(err => {
        setIsLoggedin(false);
      });
  }, []);

  useEffect(() => {
    axios
      .post("/checktoken")
      .then(res => {
        setIsLoggedin(res.data);
      })
      .catch(err => {
        setIsLoggedin(false);
      });
  }, [props]);

  function settings() {
    return isLoggedin ? (
      <NavItem>
        <NavLink to="/postauthor" className="nav-link">
          Settings
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  }

  function signInOut() {
    return isLoggedin ? (
      <NavItem>
        <NavLink to="/signout" className="nav-link">
          Sign Out
        </NavLink>
      </NavItem>
    ) : (
      <NavItem>
        <NavLink to="/signin" className="nav-link">
          Sign In
        </NavLink>
      </NavItem>
    );
  }

  function createArticle() {
    return isLoggedin ? (
      <NavItem>
        <NavLink to="/postarticle" className="nav-link">
          Create Article
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  }
  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              {createArticle()}
              {signInOut()}
              {settings()}
            </Nav>
          </Col>
        </Row>
        <App />
      </Container>
    </div>
  );
}
