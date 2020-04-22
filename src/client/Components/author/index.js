import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Jumbotron, Button } from "reactstrap";

export default function Author(props) {
  const [author, setAuthor] = useState({});
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    match: { params }
  } = props;

  useEffect(() => {
    setLoading(true);
    axios
      .all([
        axios.get(`/api/users?userId=${params.authorId}`),
        axios.get(`/api/articles?userId=${params.authorId}`)
      ])
      .then(resArray => {
        setLoading(false);
        setError(false);
        setAuthor(resArray[0].data);
        setArticles(resArray[1].data);
      })
      .catch(err => {
        setLoading(false);
        setError(true);
      });
  }, []);

  if (loading) {
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
  if (error) {
    return (
      <Row>
        <Col>
          <Jumbotron>
            <p className="lead" style={{ fontWeight: "bold" }}>
              <h1>Error fetching author info and activity..</h1>
            </p>
          </Jumbotron>
          <br />
        </Col>
      </Row>
    );
  }
  if (author[0] && (author[0].firstName || author[0].lastName)) {
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
                        props.history.push(`/article/${article._id}`, article);
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

  return (
    <Row>
      <Col>
        <Jumbotron>
          <p className="lead" style={{ fontWeight: "bold" }}>
            <h1>......</h1>
          </p>
        </Jumbotron>
        <br />
      </Col>
    </Row>
  );
}
