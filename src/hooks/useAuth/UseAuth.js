import { useContext } from "react";
import { authContext } from "./../authProvider/AuthProvider";

const UseAuth = () => {
  return useContext(authContext);
};

export default UseAuth;
