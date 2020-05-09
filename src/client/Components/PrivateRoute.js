import React from "react";
import { Route, Redirect } from "react-router-dom";
import UserContext from "../UserContext";

export default function({ component: Component, ...rest }) {
  return (
    <UserContext.Consumer>
      {value => {
        console.log("whats the value", value);
        return (
          <Route
            {...rest}
            render={props => {
              return value ? (
                <Component {...props} />
              ) : (
                <Redirect to="/signin" />
              );
            }}
          />
        );
      }}
    </UserContext.Consumer>
  );
}
