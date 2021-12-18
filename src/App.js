import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Navigation from "./Components/Navigation/Navigation";
import Login from "./Components/login/Login";
import AuthProvider from "./hooks/authProvider/AuthProvider";
import DetailPage from "./Components/detailPage/DetailPage";
import Home from "./Components/home/Home";
import MyAccount from "./Components/myAccount/MyAccount";
import Myorder from "./Components/muorder/Myorder";
import Payment from "./Components/pament/Payment";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Navigation />

          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/detail/:id">
              <DetailPage />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/frofile">
              <MyAccount />
            </Route>
            <Route path="/myorder">
              <Myorder />
            </Route>
            <Route path="/payment">
              <Payment />
            </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
