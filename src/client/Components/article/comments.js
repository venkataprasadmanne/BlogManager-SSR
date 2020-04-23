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

export default function Comments(props) {
  const { comments, username, articleId, updateArticle, commentId } = props;
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
                          updateArticle(res.data.comments);
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
                      updateArticle(comments, comment._id);
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

Comments.propTypes = {
  comments: PropTypes.instanceOf(Array).isRequired
};
