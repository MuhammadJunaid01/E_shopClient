import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("https://morning-retreat-22291.herokuapp.com/cloths")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);
  return (
    <div>
      <Container>
        <Row className="gy-3">
          {products?.map((products) => (
            <Col key={products._id} xs={12} md={3} lg={3}>
              <Card>
                <Card.Img
                  style={{ height: "140px" }}
                  variant="top"
                  src={products.image}
                />
                <Card.Body>
                  <Card.Title>{products.name}</Card.Title>
                  <Card.Text></Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default AllProducts;
