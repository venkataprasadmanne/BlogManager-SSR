import React from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import RTEditor from "../RTEditor";

class PostArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { title: "", description: "" };
    this.onchangeRTEditor = this.onchangeRTEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onchangeRTEditor(value) {
    this.setState({ description: value.toString("html") });
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    const { title, description } = this.state;
    const authorId = "venkatap";
    const { push } = this.props.history;
    return (
      <Row>
        <Col>
          <br />
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="title"
                id="titleInput"
                placeholder="Please enter article title"
                value={title}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <RTEditor onChangeRTE={this.onchangeRTEditor} />
            </FormGroup>
            <Button
              color="info"
              onClick={() => {
                axios
                  .post("/api/articles", { authorId, title, description })
                  .then(res => {
                    console.log(res);
                    const { _id, title, description, comments } = res.data;
                    push(`/article/${_id}`, {
                      _id,
                      title,
                      description,
                      comments
                    });
                  })
                  .catch(err => {
                    console.log(err);
                  });
              }}
            >
              Create Article
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default PostArticle;
