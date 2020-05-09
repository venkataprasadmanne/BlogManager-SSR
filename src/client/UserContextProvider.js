import React from "react";
import UserContext from "./UserContext";

export default function WrapUserContextpProvider(props) {
  /* console.log("executing context");
  const { children } = props;
   console.log("executing context");
  const [isLoggedin, setIsLoggedin] = useState(false);
  const { children } = props;
  useEffect(() => {
    console.log("executing context", props);
    axios
      .post("/checktoken")
      .then(res => {
        setIsLoggedin(res.data);
      })
      .catch(
        err => {
          setIsLoggedin(false);
        },
        [props]
      );
  });
  console.log("executing context"); */
  return <UserContext.Provider {...props} />;
}
