import React from "react";
import { Jumbotron, Row, Col } from "reactstrap";
import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";
import { Link } from "react-router-dom";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Comments from "./comments";
import CommentInput from "./commentInput";

class Article extends React.Component {
  constructor(props) {
    super(props);
    this.state = { comments: [], user: {} };
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
        console.log("api user response", res);
        this.setState({ user: res.data });
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

  updateArticle(comments) {
    this.setState({ comments });
  }

  render() {
    const { _id, title, description, author } = this.props.location.state;
    const { username } = this.state.user;
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
              {"      "}
              {username === author ? <MdDelete /> : null}
              {"      "}
              {username === author ? <FaEdit /> : null}
            </Jumbotron>
            <span>Comments:</span>
            <Comments comments={comments} username={username} />
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
