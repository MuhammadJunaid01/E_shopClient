import { React, useState, useEffect } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import UseAuth from "./../../hooks/useAuth/UseAuth";
import "./myAccount.css";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
const MyAccount = () => {
  const { user } = UseAuth();
  const [totalMyOrder, setTotalMuOrder] = useState([]);
  const [loader, setLoader] = useState(true);
  console.log(user);
  useEffect(() => {
    fetch(
      `https://morning-retreat-22291.herokuapp.com/totalMyOrder/${user.email}`
    )
      .then((res) => res.json())
      .then((data) => setTotalMuOrder(data))
      .catch((err) => console.log(err))
      .finally(() => setLoader(false));
  }, []);
  return (
    <div>
      <Container>
        <Row>
          <Col xs={6} md={4} lg={4}>
            <Card style={{ textAlign: "center", padding: "20px" }}>
              <Card.Img
                className="myAccountImage"
                variant="top"
                src={user?.photoURL}
              />
              <Card.Body>
                <Card.Title>{user?.displayName}</Card.Title>
                <Card.Text>
                  <Link
                    style={{
                      color: "black",
                      textDecoration: "none",
                      fontSize: "20px",
                    }}
                    to="/myorder"
                  >
                    My Order
                  </Link>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={6} md={8} lg={8}>
            {totalMyOrder?.map((myorder) => (
              <Table key={myorder._id} striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Cloth image</th>
                    <th>Last Category</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        style={{ height: "60px" }}
                        src={myorder?.image}
                        alt="myorder"
                      ></img>
                    </td>
                    <td>{myorder?.name}</td>
                    <td>{myorder.status}</td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MyAccount;
