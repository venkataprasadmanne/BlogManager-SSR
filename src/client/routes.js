import SignOut from "./Components/signOut";
import Article from "./Components/article";
import Author from "./Components/author";
import PostArticle from "./Components/postarticle";
import SignIn from "./Components/signin";
import SignUp from "./Components/signup";
import Home from "./Components/home";

export default [
  { ...Home, exact: true, path: "/" },
  { ...SignIn, path: "/signin" },
  { ...SignUp, path: "/signup" },
  { ...SignOut, path: "/signout" },
  { ...PostArticle, path: "/postarticle", private: true },
  { ...Article, path: "/article/:articleId", private: true },
  { ...Author, path: "/author/:authorId", private: true },
  { ...SignUp, path: "/postauthor", private: true }
];
