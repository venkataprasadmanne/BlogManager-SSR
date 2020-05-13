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

export const FETCH_ARTICLES = "fetch_articles";
export const FETCH_ARTICLES_ERROR = "fetch_articles_error";
export const FETCH_ARTICLES_LOADING = "fetch_articles_loading";
export const fetchArticles = () => dispatch => {
  dispatch({ type: FETCH_ARTICLES_LOADING, loading: true });
  axios
    .get("/api/articles")
    .then(res => {
      dispatch({ type: FETCH_ARTICLES_LOADING, loading: false });
      dispatch({
        type: FETCH_ARTICLES,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch({
        type: FETCH_ARTICLES_ERROR,
        error: err
      });
    });
};

export const FETCH_USER_INFO = "fetch_user_info";
export const FETCH_ARTICLES_FOR_USER = "fetch_article_info";
export const FETCH_ARTICLES_FOR_USER_ERROR = "fetch_article_info_error";
export const FETCH_ARTICLES_FOR_USER_LOADING = "fetch_article_info_loading";
export const fetchUserInfo = authorId => dispatch => {
  dispatch({ type: FETCH_ARTICLES_FOR_USER_LOADING, loading: true });
  axios
    .all([
      axios.get(`/api/users?userId=${authorId}`),
      axios.get(`/api/articles?userId=${authorId}`)
    ])
    .then(resArray => {
      dispatch({ type: FETCH_ARTICLES_FOR_USER_LOADING, loading: false });
      dispatch({ type: FETCH_ARTICLES_FOR_USER_ERROR, error: false });
      dispatch({ type: FETCH_USER_INFO, user: resArray[0].data });
      dispatch({ type: FETCH_ARTICLES_FOR_USER, articles: resArray[1].data });
    })
    .catch(err => {
      dispatch({ type: FETCH_ARTICLES_FOR_USER_LOADING, loading: false });
      dispatch({ type: FETCH_ARTICLES_FOR_USER_ERROR, error: true });
    });
};

export const POST_ARTICLE_START = "post_article_start";
export const POST_ARTICLE_END = "post_article_end";
export const POST_ARTICLE_ERROR = "post_article_error";
export const POST_ARTICLE_UNMOUNT = "post_article_unmount";
export const postArticle = (articleId, data) => dispatch => {
  console.log("articleId", articleId);
  console.log("data", data);
  const url = articleId ? `/api/articles/${articleId}` : "/api/articles";
  const { title, description } = data;
  dispatch({ type: POST_ARTICLE_START });
  axios
    .post(url, {
      title,
      description: description.toString("html")
    })
    .then(res => {
      dispatch({ type: POST_ARTICLE_END, article: res.data });
    })
    .catch(() => {
      dispatch({ type: POST_ARTICLE_ERROR });
    });
};

export const SIGN_IN_START = "sign_in_start";
export const SIGN_IN_END = "sign_in_end";
export const SIGN_IN_ERROR = "sign_in_error";
export const SIGN_IN_UNMOUNT = "sign_in_unmount";
export const signIn = (username, password) => dispatch => {
  dispatch({ type: SIGN_IN_START });
  axios
    .post("/login", { username, password })
    .then(res => {
      dispatch({ type: SIGN_IN_END, token: res.data.token });
    })
    .catch(err => {
      dispatch({ type: SIGN_IN_ERROR });
      localStorage.setItem("token", "");
    });
};

export const SIGN_UP_START = "sign_up_start";
export const SIGN_UP_END = "sign_up_end";
export const SIGN_UP_ERROR = "sign_up_error";
export const SIGN_UP_UNMOUNT = "sign_up_unmount";
export const SIGN_UP_MOUNT = "sign_up_mount";
export const signUp = userDetails => dispatch => {
  dispatch({ type: SIGN_UP_START });
  const {
    id,
    firstName,
    lastName,
    email,
    bioDescription,
    username,
    password
  } = userDetails;
  if (!id) {
    axios
      .post("/api/users", {
        firstName,
        lastName,
        email,
        bioDescription: bioDescription.toString("html"),
        username,
        password
      })
      .then(response => {
        dispatch({
          type: SIGN_UP_END,
          data: userDetails,
          token: response.data.token
        });
      })
      .catch(err => {
        dispatch({
          type: SIGN_UP_ERROR
        });
      });
  } else {
    axios
      .post(`/api/users/${id}`, {
        data: {
          firstName,
          lastName,
          email,
          bioDescription: bioDescription.toString("html"),
          username,
          password
        }
      })
      .then(response => {
        dispatch({
          type: SIGN_UP_END,
          data: userDetails,
          token: response.data.token
        });
      })
      .catch(err => {
        dispatch({
          type: SIGN_UP_ERROR
        });
      });
  }
};
