import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Page from "./Page";
// import Navbar from './Navbar';
import * as serviceWorker from "./serviceWorker";
import "bootstrap/dist/css/bootstrap.css";
import WrapUserContext from "./UserContext";

ReactDOM.render(
  <Router>
    <WrapUserContext>
      <Route path="/" eaxct component={Page} />
    </WrapUserContext>
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
