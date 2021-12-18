import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, Route, Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom/cjs/react-router-dom.min";
import AllProducts from "./all products/AllProducts";
import ConfirmOrder from "./confirm order/ConfirmOrder";
import "./dashboard.css";
import MakeAdmin from "./makeAdmin/MakeAdmin";
const Dashboard = () => {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Container>
        <Row>
          <Col xs={12} md={2} lg={2}>
            <div className="dashBoardLit">
              <ul>
                <li>
                  <Link className="dashboardLink" to={`${url}/allproducts`}>
                    All Products
                  </Link>
                </li>
                <li>
                  <Link className="dashboardLink" to={`${url}/makeAdmin`}>
                    Make Admin
                  </Link>
                </li>
                <li>
                  <Link className="dashboardLink" to={`${url}/conFirmOrder`}>
                    Confirm Order
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
          <Col xs={12} md={10} lg={10}>
            <Switch>
              <Route exact path={path}>
                <h3>Please select a topic.</h3>
              </Route>
              <Route path={`${path}/allproducts`}>
                <AllProducts />
              </Route>
              <Route path={`${path}/makeAdmin`}>
                <MakeAdmin />
              </Route>
              <Route path={`${path}/conFirmOrder`}>
                <ConfirmOrder />
              </Route>
            </Switch>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Dashboard;
