import React, { useState, useEffect } from "react";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete, MdThumbUp } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Comments from "./comments";
import CommentInput from "./commentInput";

function Article(props) {
  let [comments, setComments] = useState([]);
  const [user, setUser] = useState({});
  let [likes, setLikes] = useState(0);
  const [commentId, setCommentId] = useState("");

  useEffect(() => {
    axios
      .get("/api/userinfo")
      .then(res => {
        setUser(res.data.username);
      })
      .catch(err => {
        console.log("err");
      });
  }, []);

  function updateArticle(comments, commentId) {
    setComments(comments);
    setCommentId(commentId);
  }

  const { _id, title, description, author } = props.location.state;
  likes = likes || props.location.state.likes;
  const username = user;
  const { history } = props;
  comments = comments.length <= 0 ? props.location.state.comments : comments;
  let html;
  if (_id) {
    console.log("article username", username);
    console.log("article author", author);
    html = (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <p className="lead" style={{ fontWeight: "bold" }}>
                {title}
              </p>
              <hr className="my-2" />
              <p>{ReactHtmlParser(description)}</p>
              <Link to={`/author/${author}`}>{author}</Link>

              <div>
                {username === author ? (
                  <Button
                    onClick={() => {
                      axios
                        .delete(`/api/articles/${_id}`)
                        .then(res => {
                          console.log("res", res);
                          if (res.status === 200) {
                            history.push("/");
                          } else {
                            throw "something went wrong";
                          }
                        })
                        .catch(err => {
                          console.log("err", err);
                        });
                    }}
                  >
                    {" "}
                    <MdDelete />
                  </Button>
                ) : null}
                {"      "}
                {username === author ? (
                  <Button
                    onClick={() => {
                      history.push("/postarticle", {
                        articleId: _id,
                        title,
                        description
                      });
                    }}
                  >
                    <FaEdit />
{" "}
                  </Button>
                ) : null}
                {"      "}
                <Button
                  onClick={() => {
                    axios
                      .post(`/api/articles/${_id}`, { likes: likes + 1 })
                      .then(res => {
                        setLikes(likes + 1);
                      })
                      .catch(err => {
                        console.log("error", error);
                      });
                  }}
                >
                  {likes} <MdThumbUp />
                </Button>
              </div>
            </Jumbotron>
            <span>Comments:</span>
            <Comments
              comments={comments}
              username={username}
              articleId={_id}
              commentId={commentId}
              updateArticle={updateArticle}
            />
            <br />
            <CommentInput articleId={_id} updateArticle={updateArticle} />
            <br />
          </Col>
        </Row>
      </Container>
    );
  } else {
    html = (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <p className="display-3">Fetching the data ..</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }
  return html;
}

Article.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};

export default { component: Article };
