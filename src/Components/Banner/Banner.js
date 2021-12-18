import React from "react";
import { useState } from "react";
import { Carousel } from "react-bootstrap";
import "./Banner.css";
import menCloth from "../../images/mensClothBanner.png";
import womenCloth from "../../images/womens.png";
import kidsCloth from "../../images/kids.png";
const Banner = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <div>
      <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 bannerImage"
            src={menCloth}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 bannerImage"
            src={womenCloth}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 bannerImage"
            src={kidsCloth}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Banner;
