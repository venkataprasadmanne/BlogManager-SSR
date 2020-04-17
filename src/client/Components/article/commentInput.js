import React from "react";
import { Button, Form, FormGroup, Input, Row, Col } from "reactstrap";
import axios from "axios";
import PropTypes from "prop-types";

class CommentInput extends React.Component {
  constructor(props) {
    console.log("comment input constructor");
    super(props);
    this.state = {
      isEdit: !!props.description,
      description: props.description ? props.description : ""
    };
    this.changeDescription = this.changeDescription.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log("comment input get derived state from props");
    console.log(" comment input props", props);
    console.log(" comment input state", state);
  }

  componentDidMount() {
    console.log("comment input component did mount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("comment input should component update");
    console.log(" comment Input next props", nextProps);
    console.log(" comment Input next props", nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("comment input  component did update");
    console.log(" comment input prev props", prevProps);
    console.log(" comennt input  prev state", prevState);
    console.log(" comennt input  prev state", snapShot);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("comment input  get snapshot before update");
    console.log(" comment input prev props", prevProps);
    console.log(" comennt input  prev state", prevState);
  }

  changeDescription(description) {
    console.log("change description", description);
    this.setState({ description });
  }

  render() {
    const { description, isEdit } = this.state;
    const { updateArticle, articleId, commentId } = this.props;
    const authorId = "venkatap";
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
                  this.setState({ description: event.target.value });
                }}
              />
            </FormGroup>
            <Button
              color="info"
              onClick={() => {
                console.log("clicked");
                const url = isEdit
                  ? `/api/articles/${articleId}/comments/${commentId}`
                  : `/api/articles/${articleId}/comments`;
                axios
                  .post(url, {
                    description
                  })
                  .then(res => {
                    console.log("res", res);
                    this.changeDescription("");
                    updateArticle(res.data.comments);
                  })
                  .catch(err => {
                    console.log("error", err);
                  });
              }}
            >
              Post Your Comment
            </Button>
          </Form>
        </Col>
      </Row>
    );
  }
}

CommentInput.propTypes = {
  updateArticle: PropTypes.func.isRequired,
  articleId: PropTypes.string.isRequired
};

export default CommentInput;
