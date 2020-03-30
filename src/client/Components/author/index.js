import React from "react";
import { Link } from "react-router-dom";

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "venkatap"
    };
  }

  render() {
    const { username } = this.state;
    return (
      <div>
        username:
        {username}
      </div>
    );
  }
}

export default Author;
