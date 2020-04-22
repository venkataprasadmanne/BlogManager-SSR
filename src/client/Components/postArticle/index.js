import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import RichTextEditor from "react-rte";
import RTEditor from "../RTEditor";

export default function PostArticle(props) {
  const [title, setTitle] = useState(
    props.location.state && props.location.state.title
      ? props.location.state.title
      : ""
  );
  const [description, setDescription] = useState(
    props.location.state && props.location.state.description
      ? RichTextEditor.createValueFromString(
          props.location.state.description,
          "html"
        )
      : RichTextEditor.createEmptyValue()
  );

  function onchangeRTEditor(value) {
    setDescription(value);
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }
  // const { title, description } = this.state;
  const { push } = props.history;
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
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <RTEditor value={description} onChangeRTE={onchangeRTEditor} />
          </FormGroup>
          <Button
            color="info"
            onClick={() => {
              const url =
                props.location.state && props.location.state.description
                  ? `/api/articles/${props.location.state.articleId}`
                  : "/api/articles";
              axios
                .post(url, {
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
