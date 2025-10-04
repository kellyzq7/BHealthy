import React, { useState } from "react";
import "../Card.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const Meals = ({ mealType, setMealType }) => {
  const meals = [
    { name: "Breakfast", image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
    { name: "Lunch", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
    { name: "Dinner", image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % meals.length;
    setCurrentIndex(newIndex);
    setMealType(meals[newIndex].name); // sync to App.js
  };

  return (
    <div className="card-container">
      <div className="card-box">
        <p className="card-category">Meal of the Day</p>
        <p className="card-name">{meals[currentIndex].name}</p>
        <img
          src={meals[currentIndex].image}
          alt={meals[currentIndex].name}
          className="card-image"
        />
        <button onClick={handleNext} className="next-button"><MdOutlineArrowForwardIos /></button>
      </div>
    </div>
  );
};

export default Meals;
