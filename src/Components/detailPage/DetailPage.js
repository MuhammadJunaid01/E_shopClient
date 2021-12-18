import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import "./detailClots.css";
import axios from "axios";
import UseAuth from "./../../hooks/useAuth/UseAuth";
const DetailPage = () => {
  const { id } = useParams();
  const [cloth, setCloth] = useState([]);
  const [loader, setLoader] = useState(true);
  const [success, setSuccess] = useState(false);
  const { user } = UseAuth();
  const email = user.email;
  useEffect(() => {
    fetch(`http://localhost:5000/cloth/${id}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log("api data", data);
        setCloth(data);
      })
      .catch((err) => console.log("cloth api error", err))
      .finally(() => setLoader(false));
  }, []);
  const handleAddToCart = () => {
    delete cloth._id;
    let status = "pending";
    const data = {
      ...cloth,
      email,
      status,
    };
    fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.acknowledged) {
          setSuccess(true);
        }
      });
  };
  return loader ? (
    <div className="loader">
      <Spinner
        style={{ padding: "30px", fontWeight: "600", fontSize: "30px" }}
        animation="border"
        variant="warning"
      />
    </div>
  ) : (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={6} lg={6}>
            <Card>
              <Card.Img
                className="detailClothImage"
                variant="top"
                src={cloth.image}
              />
              <Card.Body>
                <Card.Title>{cloth.name}</Card.Title>
                <Card.Text>{cloth.info}</Card.Text>

                <Button onClick={handleAddToCart} variant="primary">
                  Add To Cart
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={6} lg={6}></Col>
        </Row>
      </Container>
    </div>
  );
};

export default DetailPage;
