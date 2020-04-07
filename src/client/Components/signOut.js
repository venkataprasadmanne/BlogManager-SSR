import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Alert
} from "reactstrap";
import axios from "axios";

class SignOut extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    /* const { history } = this.props;
    localStorage.setItem("token", null);
    console.log("in signout component component did mount");
    history.push("/"); */
  }

  componentWillReceiveProps() {
    /* const { history } = this.props;
    localStorage.setItem("token", null);
    console.log("in signout component component will recieve props");
    history.push("/"); */
  }

  render() {
    console.log("in signout render");
    const { history } = this.props;
    localStorage.setItem("token", null);
    console.log("in signout component component did mount");
    history.push("/");
    return (
      <Row>
        <Col>
          <br />
          <Alert>Signing Out ..Pease wait </Alert>
          <div>Signing out......</div>
        </Col>
      </Row>
    );
  }
}

export default SignOut;
