import React from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import UseAuth from "./../../hooks/useAuth/UseAuth";
import "./login.css";
import loginImage from "../../images/login.png";
const Login = () => {
  const {
    loginWithGoogle,
    setUser,
    error,
    setError,
    saveUser,
    setIsLogin,
    loginWithEmailAndPass,
    regesterWithEmail,
  } = UseAuth();
  const location = useLocation();
  const history = useHistory();

  const redirect = location.state?.from || "/";

  const { register, handleSubmit, reset } = useForm();
  const [check, setCheck] = useState(true);

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const onSubmit = (data) => {
    regesterWithEmail(data.email, data.password, data.name);
    reset();
    history.push(redirect);
  };
  const handlegooleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const displayName = user.displayName;
        saveUser(user.email, displayName, "PUT");
        setUser(...user, user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        history.push(redirect);
        setIsLogin(false);
      });
  };
  const handlereadMore = () => {
    setCheck((prevCheck) => !prevCheck);
    console.log("check", check);
  };
  const handleLogin = (e) => {
    loginWithEmailAndPass(email, password);
    e.preventDefault();
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  console.log("user");
  return (
    <div>
      <div className="loginContainer">
        <Container>
          <Row className="gy-3 row-container">
            <Col xs={12} md={8} lg={8}>
              <img className="loginImage" src={loginImage} alt="" />
            </Col>
            <Col xs={12} md={4} lg={4}>
              <Card className="cards">
                <Card.Body>
                  <Card.Title></Card.Title>
                  {check ? (
                    <>
                      <form onSubmit={handleLogin}>
                        <input
                          className="inputFeild"
                          type="email"
                          onBlur={handleEmail}
                          required
                          placeholder="Enter Your Email:"
                        />
                        <input
                          className="inputFeild"
                          type="password"
                          required
                          placeholder="Enter Your Password:"
                          onBlur={handlePassword}
                        />
                        <input type="submit" />
                      </form>
                      <Form.Check
                        onClick={handlereadMore}
                        type="checkbox"
                        label="Are You New User?"
                      />
                    </>
                  ) : (
                    <>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <input
                          className="inputFeild"
                          type="text"
                          {...register("name")}
                          required
                          placeholder="Enter Your Name:"
                        />
                        <input
                          className="inputFeild"
                          type="text"
                          {...register("address")}
                          required
                          placeholder="Enter Your Address:"
                        />
                        <input
                          className="inputFeild"
                          type="email"
                          {...register("email")}
                          required
                          placeholder="Enter Your Email:"
                        />
                        <input
                          className="inputFeild"
                          type="password"
                          {...register("password")}
                          required
                          placeholder="Enter Your Password"
                        />
                        <input type="submit" />
                      </form>
                      <Form.Check
                        onClick={handlereadMore}
                        type="checkbox"
                        label="You have allready an account?"
                      />
                    </>
                  )}
                  {error && <Card.Text>{error}</Card.Text>}

                  <Button onClick={handlegooleLogin} variant="primary">
                    Login With Google
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Login;
