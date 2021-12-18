import { initializeApp } from "firebase/app";
import firebaseConfig from "./firebaseInit";
const FirebaseAuthentication = () => {
  return initializeApp(firebaseConfig);
};

export default FirebaseAuthentication;
