import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Container,
  Row,
  Col
} from "reactstrap";
import RichTextEditor from "react-rte";
import { useSelector, useDispatch } from "react-redux";
import RTEditor from "./RTEditor";
import { postArticle, POST_ARTICLE_UNMOUNT } from "../Redux/actions";

export default function PostArticle(props) {
  const [title, setTitle] = useState(
    props.location.state && props.location.state.title
      ? props.location.state.title
      : ""
  );
  const [description, setDescription] = useState(
    props.location.state && props.location.state.description
      ? RichTextEditor.createValueFromString(
          props.location.state.description,
          "html"
        )
      : RichTextEditor.createEmptyValue()
  );

  const articleId = props.location.state
    ? props.location.state.articleId
    : null;

  const dispatch = useDispatch();
  const propsFromStore = useSelector(state => {
    return {
      article: state.postarticle.article,
      loading: state.postarticle.loading,
      error: state.postarticle.error
    };
  });

  useEffect(() => {
    return () => {
      dispatch({ type: POST_ARTICLE_UNMOUNT });
    };
  }, []);

  const { loading, article, error } = propsFromStore;
  console.log("props from store", propsFromStore);

  function onchangeRTEditor(value) {
    setDescription(value);
  }

  function handleChange(event) {
    setTitle(event.target.value);
  }
  const { push } = props.history;
  if (!loading && article && article._id) {
    const {
      _id,
      title: articleTitle,
      description: articleDescription,
      comments
    } = article;
    push(`/article/${_id}`, {
      _id,
      title: articleTitle,
      description: articleDescription,
      comments
    });
  }
  return (
    <Container>
      <Row>
        <Col>
          <br />
          <Form>
            <FormGroup>
              <Input
                type="text"
                name="title"
                id="titleInput"
                placeholder="Please enter article title"
                value={title}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <RTEditor value={description} onChangeRTE={onchangeRTEditor} />
            </FormGroup>
            <Button
              color="info"
              onClick={() => {
                postArticle(articleId, {
                  title,
                  description
                })(dispatch);
              }}
            >
              {articleId ? "Save Article" : "Create Article"}
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
