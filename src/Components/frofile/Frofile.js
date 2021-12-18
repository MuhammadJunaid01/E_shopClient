import React from "react";
import "./frofile.css";
import UseAuth from "./../../hooks/useAuth/UseAuth";
import { Link } from "react-router-dom";
const Frofile = () => {
  const { readMore, logOut, handlereadMore } = UseAuth();

  return (
    <div onClick={handlereadMore} className="frofileContainer">
      <div className="frofileContent">
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            fontSize: "20px",
          }}
          to="/frofile"
        >
          <i style={{ marginRight: "13px" }} className="far fa-user-circle"></i>
          Frofile
        </Link>

        <li
          style={{
            color: "black",
            fontSize: "20px",
            listStyleType: "none",
            cursor: "pointer",
          }}
        >
          <i
            onClick={logOut}
            style={{ marginRight: "13px" }}
            className="fas fa-sign-out-alt"
          ></i>{" "}
          Logout
        </li>
      </div>
    </div>
  );
};

export default Frofile;
