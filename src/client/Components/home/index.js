import React from "react";
import { Jumbotron, Row, Col, Button } from "reactstrap";
import axios from "axios";

axios.interceptors.request.use(
  config => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [], status: {} };
  }

  componentDidMount() {
    axios
      .get("/api/articles")
      .then(response => {
        console.log("response", response);
        this.setState({ data: response.data, status: response.status });
      })
      .catch(error => {
        console.log("error", error);
        this.setState({ status: "error" });
      });
  }

  render() {
    const { data, status } = this.state;
    if (data.length > 0) {
      return (
        <div>
          {data.map(article => {
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
    if (status === "") {
      return (
        <Row>
          <Col>
            <Jumbotron>
              <p className="display-3">Fetching aritcles ...</p>
            </Jumbotron>
          </Col>
        </Row>
      );
    }
    return (
      <Row>
        <Col>
          <Jumbotron>
            <p className="display-3">Error fetching the articles ...</p>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

export default Home;
