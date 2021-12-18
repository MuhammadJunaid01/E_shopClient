import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./mensCloth.css";
const Cloths = () => {
  const [mensCloths, setMensCloths] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch("https://morning-retreat-22291.herokuapp.com/cloths")
      .then((res) => res.json())
      .then((data) => setMensCloths(data))
      .catch((err) => console.log("mensCloth Api error", err))
      .finally(() => {
        setLoader(false);
      });
  }, []);
  const addToCart = (index) => {
    console.log("index number", index);
    console.log("arr", mensCloths[index]);
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
    <div className="mensClothContainer">
      <Container>
        <div className="mensClothInfo">
          <h1>Our Mens Cloth Collections.</h1>
        </div>
        <Row className="gy-3">
          {mensCloths?.map((Cloth, index) => (
            <Col key={index} sm={12} md={3} lg={3}>
              <Card>
                <Card.Img
                  className="mensClothImage"
                  variant="top"
                  src={Cloth?.image}
                />
                <Card.Body>
                  <Card.Title>{}</Card.Title>
                  <Card.Text></Card.Text>
                  <Link to={`/Detail/${Cloth._id}`}>
                    <Button className="viewDetail" variant="primary">
                      View Details
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Cloths;
