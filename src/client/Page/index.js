import React, { useState } from "react";
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import App from "../App";
import "./nav.css";

const Example = props => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen(!dropdownOpen);

  const isLoggedIn = false;

  const signInOut = () => {
    return isLoggedIn ? (
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
  };

  const settings = () => {
    return isLoggedIn ? (
      <NavItem>
        <NavLink to="/postauthor" className="nav-link">
          Settings
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  };

  const createArticle = () => {
    return isLoggedIn ? (
      <NavItem>
        <NavLink to="/postarticle" className="nav-link">
          Create Article
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  };

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
};

export default Example;
