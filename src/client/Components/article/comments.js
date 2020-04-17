import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge,
  Button
} from "reactstrap";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import PropTypes from "prop-types";
import CommentInput from "./commentInput";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = { commentId: "" };
  }

  static getDerivedStateFromProps(props, state) {
    console.log("comennts get derived state from props");
    console.log(" comments props", props);
    console.log(" comments state", state);
  }

  componentDidMount() {
    console.log("comments component did mount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("comments should component update");
    console.log(" comments next props", nextProps);
    console.log(" comments next props", nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("comments  component did update");
    console.log(" comments prev props", prevProps);
    console.log(" comennts prev state", prevState);
    console.log(" comennts prev state", snapShot);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("comments  get snapshot before update");
    console.log(" comments prev props", prevProps);
    console.log(" comennts prev state", prevState);
  }

  render() {
    const { comments, username, articleId, updateArticle } = this.props;
    const { commentId } = this.state;
    const that = this;
    console.log("comments", comments);
    console.log("username", username);
    return (
      <ListGroup>
        {comments.map(comment => {
          const jsx =
            comment._id === commentId ? (
              <CommentInput
                articleId={articleId}
                commentId={comment._id}
                updateArticle={updateArticle}
                description={comment.description}
              />
            ) : (
              <ListGroupItem>
                <ListGroupItemHeading>
                  <Badge color="secondary">{comment.author}</Badge>
                </ListGroupItemHeading>
                <ListGroupItemText>
                  {comment.description}
                  {"      "}
                  {username === comment.author ? (
                    <Button
                      onClick={() => {
                        axios
                          .delete(
                            `/api/articles/${articleId}/comments/${comment._id}`
                          )
                          .then(res => {
                            console.log("res", res);
                            updateArticle(res.data.comments);
                            that.setState({ commentId: "" });
                          })
                          .catch(err => {
                            console.log("err", err);
                          });
                      }}
                    >
                      <MdDelete />
                    </Button>
                  ) : null}
                  {"      "}
                  {username === comment.author ? (
                    <Button
                      onClick={() => {
                        that.setState({ commentId: comment._id });
                      }}
                    >
                      <FaEdit />
                    </Button>
                  ) : null}
                </ListGroupItemText>
              </ListGroupItem>
            );
          return jsx;
        })}
      </ListGroup>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.instanceOf(Array).isRequired
};

export default Comments;
