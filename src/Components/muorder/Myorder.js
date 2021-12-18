import React, { useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UseAuth from "../../hooks/useAuth/UseAuth";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";
import { axios } from "axios";
const Myorder = () => {
  const { user, myorder, totalPrice } = UseAuth();
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const handleDelete = (id) => {
    console.log("delete id", id);
    const confirm = window.confirm("are you sure?");
    console.log("order canceld", id);
    if (confirm) {
      fetch(`https://morning-retreat-22291.herokuapp.com/myorder/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            alert("successfully deleted");
          }
          console.log("delete order ", data);
        });
    }
  };
  return (
    <div>
      <Container>
        <h1>my order</h1>
        <Row>
          <Col xs={12} md={8} lg={8}>
            {myorder?.map((myorder, index) => (
              <Table key={myorder._id} striped bordered hover>
                <thead>
                  <tr>
                    <th>Cloth image</th>
                    <th>Last Category</th>
                    <th>Price</th>
                    <th>Cancel Order</th>
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

                    <td>${myorder.price}</td>
                    <td>
                      <i
                        onClick={() => handleDelete(myorder._id)}
                        style={{
                          color: "red",
                          fontSize: "23px",
                          cursor: "pointer",
                        }}
                        className="fas fa-trash-alt"
                      ></i>
                    </td>
                  </tr>
                </tbody>
              </Table>
            ))}
          </Col>
          <Col xs={12} md={4} lg={4}>
            <Card>
              <Card.Body>
                <Card.Title>Total Price ${totalPrice}</Card.Title>
                <Card.Text> Tax: $0 </Card.Text>
                <hr />
                <Link to="/payment">
                  <Button variant="primary">Cheack Out</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Myorder;
