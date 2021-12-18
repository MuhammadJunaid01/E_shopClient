import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";

const ConfirmOrder = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [loader, setLoader] = useState(true);
  useEffect(() => {
    fetch("https://morning-retreat-22291.herokuapp.com/allorders")
      .then((res) => res.json())
      .then((data) => setAllOrders(data))
      .finally(() => setLoader(false));
  }, []);
  const handleConfirm = (id) => {
    fetch(`https://morning-retreat-22291.herokuapp.com/confirmOrder/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(allOrders),
    });
  };
  return (
    <div>
      <h1>hello confirm{allOrders?.length}</h1>

      {allOrders?.map((myorder, index) => (
        <Table key={myorder._id} striped bordered hover>
          <thead>
            <tr>
              <th>Cloth image</th>
              <th>Last Category</th>
              <th>Price</th>
              <th>Confirm Order</th>
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
                  onClick={() => handleConfirm(myorder._id)}
                  style={{
                    color: "green",
                    fontSize: "23px",
                    cursor: "pointer",
                  }}
                  className="far fa-check-circle"
                ></i>
              </td>
            </tr>
          </tbody>
        </Table>
      ))}
    </div>
  );
};

export default ConfirmOrder;
