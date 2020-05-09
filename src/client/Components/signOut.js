import React from "react";
import { Row, Col, Alert } from "reactstrap";

export default function SignOut(props) {
  const { history } = props;
  localStorage.setItem("token", null);
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
