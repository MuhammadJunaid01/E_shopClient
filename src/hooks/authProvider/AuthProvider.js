import { createContext } from "react";
import useFirebase from "./../UseFirebase";

export const authContext = createContext();
const AuthProvider = ({ children }) => {
  const auth = useFirebase();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;
