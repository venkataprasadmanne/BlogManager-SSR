import React, { useEffect, useCallback } from "react";
import { Jumbotron, Container, Row, Col, Button } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchArticles } from "../../Redux/actions";

function Home(props) {
  const propsFromStore = useSelector(state => {
    console.log("redux state", state);
    return {
      data: state.articles.data,
      error: state.articles.error,
      loading: state.articles.loading
    };
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchArticles()(dispatch);
  }, []);
  const { data, loading, error } = propsFromStore;
  if (data.length > 0) {
    return (
      <Container>
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
      </Container>
    );
  }
  if (loading === true) {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <p className="display-3">Fetching aritcles ...</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }

  if (error === true) {
    return (
      <Container>
        <Row>
          <Col>
            <Jumbotron>
              <p className="display-3">Error fetching the articles ...</p>
            </Jumbotron>
          </Col>
        </Row>
      </Container>
    );
  }

  return (
    <Container>
      <Row>
        <Col>
          <Jumbotron>
            <p className="display-3">...</p>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;
