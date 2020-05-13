import React from "react";
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
// mport App from "../App";
import "./nav.css";
import UserContext from "../UserContext";
import PageContextProvider from "./PageContextProvider";

export default function Navbar(props) {
  console.log("in nav bar ", props);
  function settings(isLoggedin) {
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

  function signInOut(isLoggedin) {
    console.log("is this function signinout  called", isLoggedin);
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
  return (
    <PageContextProvider {...props}>
      <Container>
        <Row>
          <Col>
            <Nav tabs>
              <NavItem>
                <NavLink to="/" className="nav-link">
                  Home
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink to="/postarticle" className="nav-link">
                  Create Article
                </NavLink>
              </NavItem>
              <UserContext.Consumer>
                {value => signInOut(value)}
              </UserContext.Consumer>
              <UserContext.Consumer>
                {value => settings(value)}
              </UserContext.Consumer>
            </Nav>
          </Col>
        </Row>
      </Container>
    </PageContextProvider>
  );
}
