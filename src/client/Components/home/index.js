import React, { useState, useEffect } from "react";
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

export default function Home(props) {
  const [loading, setLoading] = useState(null);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/articles")
      .then(response => {
        setLoading(true);
        setData(response.data);
      })
      .catch(() => {
        setError(true);
      });
  }, []);
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
  if (loading === true) {
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

  if (error === true) {
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

  return (
    <Row>
      <Col>
        <Jumbotron>
          <p className="display-3">...</p>
        </Jumbotron>
      </Col>
    </Row>
  );
}
