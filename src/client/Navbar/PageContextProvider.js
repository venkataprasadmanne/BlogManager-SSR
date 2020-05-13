import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContextProvider from "../UserContextProvider";

export default function PageContextProvider(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    axios
      .post("/checktoken")
      .then(res => {
        setIsLoggedin(res.data);
      })
      .catch(err => {
        setIsLoggedin(false);
      });
  }, [props]);
  return (
    <UserContextProvider value={isLoggedin}>
      {props.children}
    </UserContextProvider>
  );
}
