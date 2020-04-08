import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Row, Col, Jumbotron, Button } from "reactstrap";

class Author extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      author: {},
      error: {}
    };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    console.log("match", this.props.match);
    axios
      .all([
        axios.get(`/api/users?userId=${params.authorId}`),
        axios.get(`/api/articles?userId=${params.authorId}`)
      ])
      .then(resArray => {
        console.log("resArray", resArray);
        this.setState({
          author: resArray[0].data,
          articles: resArray[1].data
        });
      })
      .catch(err => {
        console.log("err", err);
        this.setState({ error: err });
      });
  }

  componentWillReceiveProps() {
    const {
      match: { params }
    } = this.props;
    console.log("match", this.props.match);
    Promise.all(
      axios.get(`/api/users?userId=${params.authorId}`),
      axios.get(`/api/users?userId=${params.authorId}`)
    )
      .then(resArray => {
        console.log("resArray", resArray);
        this.setState({
          author: resArray[0],
          articles: resArray[1]
        });
      })
      .catch(err => {
        this.setState({ error: err });
      });
  }

  render() {
    const { author, articles } = this.state;
    console.log("author", author);
    console.log("articles", articles);
    if (!author[0] || !articles[0]) {
      return (
        <Row>
          <Col>
            <Jumbotron>
              <p className="lead" style={{ fontWeight: "bold" }}>
                <h1>Loading ......</h1>
              </p>
            </Jumbotron>
            <br />
          </Col>
        </Row>
      );
    }
    return (
      <div>
        <Row>
          <Col>
            <Jumbotron>
              <h1 className="display-3">{`${author[0].firstName},${author[0].lastName}`}</h1>
              <hr className="my-2" />
              <p className="lead">{author[0].bioDescription}</p>
            </Jumbotron>
          </Col>
        </Row>
        {articles.map(article => {
          return (
            <Row>
              <Col>
                <Jumbotron>
                  <p className="lead" style={{ fontWeight: "bold" }}>
                    {article.title}
                  </p>
                  <hr className="my-2" />
                  <p>
                    {!article.description || article.description.length < 200
                      ? article.description
                      : `${article.description.substring(0, 200)}...`}
                  </p>
                  <p className="lead">
                    <Button
                      color="primary"
                      onClick={() => {
                        // eslint-disable-next-line no-underscore-dangle
                        this.props.history.push(
                          `/article/${article._id}`,
                          article
                        );
                      }}
                    >
                      Learn more
                    </Button>
                  </p>
                </Jumbotron>
              </Col>
            </Row>
          );
        })}
      </div>
    );
  }
}

export default Author;
