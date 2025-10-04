import React, { useState } from "react";

const DiningHalls = ({ diningHall, setDiningHall }) => {
  const halls = [
    { name: "De Neve Dining", image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png" },
    { name: "Bruin Plate", image: "https://cdn-icons-png.flaticon.com/512/857/857681.png" },
    { name: "Epicuria at Covel", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % halls.length;
    setCurrentIndex(newIndex);
    setDiningHall(halls[newIndex].name); // sync to App.js
  };

  return (
    <div className="meals-container">
      <div className="meal-box">
        <p className="form-category">Dining Hall</p> 
        <p className="meal-name">{halls[currentIndex].name}</p>
        <img
          src={halls[currentIndex].image}
          alt={halls[currentIndex].name}
          className="meal-image"
        />
        <button onClick={handleNext} className="next-button">➡</button>
      </div>
    </div>
  );
};

export default DiningHalls;
