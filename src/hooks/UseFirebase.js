import React, { useEffect } from "react";
import { useState } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import FirebaseAuthentication from "./useFirebase/FirebaseAuthentication";
const useFirebase = () => {
  FirebaseAuthentication();
  const MySwal = withReactContent(Swal);
  const LogoutSuccesfull = () => {
    MySwal.fire({
      title: <strong>You successfully Logout!</strong>,
      html: <i>You clicked the button!</i>,
      icon: "success",
    });
  };

  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();
  const [admin, setAdmin] = useState(false);
  const [user, setUser] = useState({});
  const [loader, setLoader] = useState(true);
  const [error, setError] = useState("");
  const [myorder, setMyorder] = useState([]);
  const [readMore, setReadMore] = useState(true);
  const handlereadMore = () => {
    setReadMore((prevCheck) => !prevCheck);
    console.log("usefirebase", readMore);
  };
  const loginWithGoogle = () => {
    setLoader(true);
    return signInWithPopup(auth, googleProvider);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/myorder/${user.email}`)
      .then((res) => res.json())
      .then((data) => setMyorder(data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, [user.email]);
  useEffect(() => {
    setLoader(true);
    onAuthStateChanged(auth, (user) => {
      if (user?.email) {
        setUser(user);
        // getIdToken(user).then((idToken) => {
        //   console.log(idToken);
        //   localStorage.setItem(idToken);
        // });
      } else {
      }
      setLoader(false);
    });
  }, [auth]);
  const logOut = () => {
    signOut(auth)
      .then(() => {
        // alert("You are successfully Logout!  ");
        LogoutSuccesfull();
        setUser({});
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("admin", data.admin);
        setAdmin(data.admin);
      });
  }, [user?.email]);
  const regesterWithEmail = (email, password, name) => {
    setLoader(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const newUser = { email, displayName: name };
        setUser(newUser);
        const user = userCredential.user;
        saveUser(email, name, "POST");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
        // ..
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const loginWithEmailAndPass = (email, password) => {
    setLoader(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setUser(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  const saveUser = (email, displayName, method) => {
    const user = { email, displayName };
    console.log("save user");
    fetch("http://localhost:5000/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    }).then();
  };
  const totalPrice = myorder.reduce(
    (sum, myorder) => parseInt(sum) + parseInt(myorder.price),
    0
  );
  return {
    user,
    setUser,
    loader,
    setLoader,
    error,
    setError,
    loginWithGoogle,
    logOut,
    regesterWithEmail,
    loginWithEmailAndPass,
    saveUser,
    admin,
    myorder,
    readMore,
    setReadMore,
    handlereadMore,
    totalPrice,
  };
};

export default useFirebase;
