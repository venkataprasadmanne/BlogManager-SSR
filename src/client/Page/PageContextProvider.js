import React, { useState, useEffect } from "react";
import axios from "axios";
import UserContextProvider from "../UserContextProvider";

export default function Page(props) {
  const [isLoggedin, setIsLoggedin] = useState(false);

  useEffect(() => {
    console.log("firing check token to reevaluate");
    axios
      .post("/checktoken")
      .then(res => {
        setIsLoggedin(res.data);
      })
      .catch(err => {
        setIsLoggedin(false);
      });
  }, [props]);
  console.log("are we re running again after checktoken failed?");
  return (
    <UserContextProvider value={isLoggedin}>
      {props.children}
    </UserContextProvider>
  );
}
