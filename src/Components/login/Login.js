import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import UseAuth from "./../../hooks/useAuth/UseAuth";
import "./login.css";
const Login = () => {
  const {
    loginWithGoogle,
    user,
    logOut,
    setUser,
    error,
    setError,
    saveUser,
    setLoader,
  } = UseAuth();
  console.log("user", user);
  const location = useLocation();
  const history = useHistory();
  const redirect = location.state?.from || "/home";
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
  const handlegooleLogin = () => {
    loginWithGoogle()
      .then((result) => {
        const user = result.user;
        const displayName = user.displayName;
        saveUser(user.email, user.displayName, "PUT");

        console.log("user,display name", user, displayName);
        setUser(...user, user);

        history.push(redirect);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setError(errorMessage);
      })
      .finally(() => {
        setLoader(false);
      });
  };
  return (
    <div className="loginContainer">
      <Container>
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register("firstName", { required: true, maxLength: 20 })}
              />
              <input {...register("lastName", { pattern: /^[A-Za-z]+$/i })} />
              <input type="number" {...register("age", { min: 18, max: 99 })} />
              <input type="submit" />
            </form>
            {error && <Card.Text>{error}</Card.Text>}

            <Button onClick={handlegooleLogin} variant="primary">
              Login With Google
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Login;
