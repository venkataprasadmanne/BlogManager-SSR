import React from "react";
import { Route } from "react-router-dom";
// import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import SignOut from "./Components/signOut";
import Article from "./Components/article";
import Author from "./Components/author";
import PostArticle from "./Components/postArticle";
import SignIn from "./Components/signIn";
import SignUp from "./Components/signUp";
import Home from "./Components/home";
import PrivateRoute from "./Components/PrivateRoute";

/* const config = {
  issuer: "https://dev-137949.okta.com/oauth2/default",
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: "0oa4og5fjBugxs9F14x6",
  pkce: true
}; */

const App = () => {
  return (
    <div>
      <Route path="/" exact component={Home} />
      <Route path="/signin" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={SignOut} />
      <PrivateRoute path="/postarticle" component={PostArticle} />
      <PrivateRoute path="/article/:articleId" component={Article} />
      <PrivateRoute path="/author/:authorId" component={Author} />
      <PrivateRoute path="/postauthor" component={SignUp} />
    </div>
  );
};

export default App;
