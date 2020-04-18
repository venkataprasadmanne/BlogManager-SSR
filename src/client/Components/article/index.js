import React from "react";
import { Jumbotron, Row, Col, Button } from "reactstrap";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete, MdThumbUp } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Comments from "./comments";
import CommentInput from "./commentInput";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], user: {}, likes: 0 , commentId:""};
    this.updateArticle = this.updateArticle.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    console.log("article get derived state from props");
    console.log(" article props", props);
    console.log(" article state", state);
  }

  componentDidMount() {
    console.log("Article component did mount");
    axios
      .get("/api/userinfo")
      .then(res => {
        console.log("res123456", res);
        console.log("api user response", res);
        this.setState({ user: res.data.username });
      })
      .catch(err => {
        console.log("err");
      });
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("article should component update");
    console.log(" article next props", nextProps);
    console.log(" article next props", nextState);
    return true;
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    console.log("article  component did update");
    console.log(" article prev props", prevProps);
    console.log(" article prev state", prevState);
    console.log(" article prev state", snapShot);
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("article  get snapshot before update");
    console.log(" article prev props", prevProps);
    console.log(" article prev state", prevState);
  }

  updateArticle(comments,commentId) {
    this.setState({ comments, commentId });
  }

  render() {
    const that = this;
    const { _id, title, description, author } = this.props.location.state;
    const likes = this.state.likes
      ? this.state.likes
      : this.props.location.state.likes;
    const username = this.state.user;
    const {commentId}=this.state;
    const { history } = this.props;
    console.log("author article ", author);
    console.log("username article ", username);
    let comments;
    if (this.state.comments.length > 0) {
      comments = this.state.comments;
    } else {
      comments = this.props.location.state.comments;
    }

    console.log("comments", comments);
    let html;
    if (_id) {
      html = (
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
                        that.setState({ likes: likes + 1 });
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
              articleId={_id} commentId = {commentId}
              updateArticle={this.updateArticle}
            />
            <br />
            <CommentInput articleId={_id} updateArticle={this.updateArticle} />
            <br />
          </Col>
        </Row>
      );
    } else {
      html = (
        <Row>
          <Col>
            <Jumbotron>
              <p className="display-3">Fetching the data ..</p>
            </Jumbotron>
          </Col>
        </Row>
      );
    }
    return html;
  }
}

Article.propTypes = {
  location: PropTypes.instanceOf(Object).isRequired
};

export default Article;
