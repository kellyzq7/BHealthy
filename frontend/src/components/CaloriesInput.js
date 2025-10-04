import React from "react";
import "../Card.css";

const Calories = ({ calorieGoal, setCalorieGoal }) => {
  return (
    <div className="card-container">
      <div className="card-box">
        <p className="card-category">Calorie Goal</p>
        <input
          type="number"
          value={calorieGoal}
          onChange={(e) => setCalorieGoal(e.target.value)}
          placeholder="Enter calorie target"
          className="calories-input"
        />
      </div>
    </div>
  );
};

export default Calories;
