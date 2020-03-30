import React from "react";
import {
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Badge
} from "reactstrap";
import PropTypes from "prop-types";

class Comments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
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
    const { comments } = this.props;
    return (
      <ListGroup>
        {comments.map(comment => {
          return (
            <ListGroupItem>
              <ListGroupItemHeading>
                <Badge color="secondary">{comment.author}</Badge>
              </ListGroupItemHeading>
              <ListGroupItemText>{comment.description}</ListGroupItemText>
            </ListGroupItem>
          );
        })}
      </ListGroup>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.instanceOf(Array).isRequired
};

export default Comments;
