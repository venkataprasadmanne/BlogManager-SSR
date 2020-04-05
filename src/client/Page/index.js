import React from "react";
import { Nav, NavItem, Container, Row, Col } from "reactstrap";
import axios from "axios";
import { NavLink } from "react-router-dom";
import App from "../App";
import "./nav.css";

class Example extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedin: false };
  }

  componentDidMount() {
    axios
      .post("/checktoken")
      .then(res => {
        this.setState({ isLoggedin: res });
      })
      .catch(err => {
        this.setState({ isLoggedin: false });
      });
  }

  settings() {
    return this.state.isLoggedin ? (
      <NavItem>
        <NavLink to="/postauthor" className="nav-link">
          Settings
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  }

  signInOut() {
    return this.state.isLoggedin ? (
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

  createArticle() {
    return this.state.isLoggedin ? (
      <NavItem>
        <NavLink to="/postarticle" className="nav-link">
          Create Article
        </NavLink>
      </NavItem>
    ) : (
      ""
    );
  }

  render() {
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
                {this.createArticle()}
                {this.signInOut()}
                {this.settings()}
              </Nav>
            </Col>
          </Row>
          <App />
        </Container>
      </div>
    );
  }
}

export default Example;
