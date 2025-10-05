import React, { useState } from "react";
import "../Card.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const DiningHalls = ({ diningHall, setDiningHall }) => {
  const halls = [
    { name: "De Neve Dining", image: "../images/denevedining_circle.png" },
    { name: "Bruin Plate", image: "../images/bplate_circle.png" },
    { name: "Epicuria at Covel", image: "../images/epicatcovel_circle.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % halls.length;
    setCurrentIndex(newIndex);
    setDiningHall(halls[newIndex].name); // sync to App.js
  };

  return (
    <div className="card-container">
      <div className="card-box">
        <p className="card-category">Dining Hall</p> 
        <p className="card-name">{halls[currentIndex].name}</p>
        <img
          src={halls[currentIndex].image}
          alt={halls[currentIndex].name}
          className="dining-image"
        />
        <button onClick={handleNext} className="next-button"> <MdOutlineArrowForwardIos /></button>
      </div>
    </div>
  );
};

export default DiningHalls;
