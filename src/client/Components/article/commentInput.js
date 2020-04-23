import React, { useState } from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

export default function CommentInput(props) {
  const [isEdit, setIsEdit] = useState(!!props.description);
  const [description, setDescription] = useState(
    props.description ? props.description : ""
  );

  function changeDescription(description) {
    setDescription(description);
  }

  const { updateArticle, articleId, commentId } = props;
  return (
    <Row>
      <Col>
        <Form>
          <FormGroup>
            <Input
              type="textarea"
              name="description"
              id="commentDescriptionInput"
              value={description}
              placeholder="Please enter your comment here"
              onChange={event => {
                setDescription(event.target.value);
              }}
            />
          </FormGroup>
          <Button
            color="info"
            onClick={() => {
              const url = isEdit
                ? `/api/articles/${articleId}/comments/${commentId}`
                : `/api/articles/${articleId}/comments`;
              axios
                .post(url, {
                  description
                })
                .then(res => {
                  changeDescription("");
                  updateArticle(res.data.comments);
                })
                .catch(err => {
                  console.log("error", err);
                });
            }}
          >
            {isEdit ? "Update Comment" : "Post Your Comment"}
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

CommentInput.propTypes = {
  updateArticle: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};
