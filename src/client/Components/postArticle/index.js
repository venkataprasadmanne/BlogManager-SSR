import React from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import RichTextEditor from "react-rte";
import RTEditor from "../RTEditor";

class PostArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.location.state && props.location.state.title ? props.location.state.title : "",
      description: this.props.location.state && props.location.state.description
        ? RichTextEditor.createValueFromString(props.location.state.description, "html")
        : RichTextEditor.createEmptyValue()
    };
    this.onchangeRTEditor = this.onchangeRTEditor.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  onchangeRTEditor(value) {
    this.setState({ description: value });
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  render() {
    const { title, description } = this.state;
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
              <RTEditor
                value={description}
                onChangeRTE={this.onchangeRTEditor}
              />
            </FormGroup>
            <Button
              color="info"
              onClick={() => {
                const url = this.props.location.state && this.props.location.state.description
                  ? `/api/articles/${this.props.location.state.articleId}`
                  : "/api/articles";
                axios
                  .post(url, {
                    // authorId,
                    title,
                    description: description.toString("html")
                  })
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
