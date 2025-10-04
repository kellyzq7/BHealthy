import React from "react";

const Calories = ({ calorieGoal, setCalorieGoal }) => {
  return (
    <div className="meal-box">
      <p className="form-category">Calorie Goal</p>
      <input
        type="number"
        value={calorieGoal}
        onChange={(e) => setCalorieGoal(e.target.value)}
        placeholder="Enter calorie target"
        className="calories-input"
      />
    </div>
  );
};

export default Calories;
