import React, { useEffect, useState } from "react";
import { Card, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./navigation.css";
import UseAuth from "./../../hooks/useAuth/UseAuth";
const Navigation = () => {
  // const [myorder, setMyorder] = useState([]);

  const {
    user,
    admin,
    logOut,
    myorder,
    readMore,
    setReadMore,
    handlereadMore,
  } = UseAuth();

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#">E Shop</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="ms-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Link className="link" to="/home">
                Home
              </Link>
              <Link className="link" to="/mens">
                Men
              </Link>
              <Link className="link" to="/womens">
                Women
              </Link>
              <Link className="link" to="/kids">
                Kids
              </Link>
              {admin && (
                <Link className="link" to="/dashboard">
                  Dashboard
                </Link>
              )}

              {user?.email ? (
                ""
              ) : (
                <Link className="link" to="/login">
                  Login
                </Link>
              )}
            </Nav>
            <div className="frofilenav">
              <span className="cartIcon">
                <i className="fas fa-shopping-cart"> {myorder?.length}</i>
              </span>
              <span className="searcheIcon">
                <i className="fas fa-search"></i>
              </span>
              {user?.email ? (
                <img
                  onClick={handlereadMore}
                  className="userImage"
                  src={user.photoURL}
                  alt="userImage"
                ></img>
              ) : (
                <span className="userIcon">
                  <i className="far fa-user"></i>
                </span>
              )}
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
