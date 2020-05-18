import React from "react";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";
// import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import PrivateRoute from "./Components/PrivateRoute";
import NavBar from "./Navbar";
import routes from "./routes";

/* const config = {
  issuer: "https://dev-137949.okta.com/oauth2/default",
  redirectUri: `${window.location.origin}/implicit/callback`,
  clientId: "0oa4og5fjBugxs9F14x6",
  pkce: true
}; */

const NavbarWithRouter = withRouter(NavBar);

const App = () => {
  return (
    <Router>
      <NavbarWithRouter />
      {routes.map(route => {
        if (route.private) {
          return <PrivateRoute {...route} />;
        }
        return <Route {...route} />;
      })}
    </Router>
  );
};
export default App;
