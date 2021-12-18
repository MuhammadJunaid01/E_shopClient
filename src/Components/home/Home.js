import React from "react";
import Cloths from "../Cloth/Cloths";
import Frofile from "../frofile/Frofile";
import UseAuth from "./../../hooks/useAuth/UseAuth";
import Banner from "./../Banner/Banner";

const Home = () => {
  const { readMore } = UseAuth();

  return (
    <div>
      <Banner />
      <Cloths />
      {readMore ? "" : <Frofile />}
    </div>
  );
};

export default Home;
