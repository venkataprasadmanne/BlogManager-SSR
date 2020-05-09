import React from "react";
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import { NavLink } from "react-router-dom";
import App from "../App";
import "./nav.css";
import UserContext from "../UserContext";
import PageContextProvider from "./PageContextProvider";

export default function Page(props) {
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
    <PageContextProvider>
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
        <App />
      </Container>
    </PageContextProvider>
  );
}
