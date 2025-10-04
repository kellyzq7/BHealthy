import React, { useState } from "react";
import Meals from "./components/MealsInput.js";
import DiningHalls from "./components/DiningHallsInput.js";
import Calories from "./components/CaloriesInput.js";
import GeneratedResponse from "./components/GeneratedMealPlan.js";
import "./App.css";

function App() {
  const [mealType, setMealType] = useState("Breakfast");
  const [diningHall, setDiningHall] = useState("De Neve Dining");
  const [calorieGoal, setCalorieGoal] = useState("");
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");
  const [showResponse, setShowResponse] = useState(false);

  const handleGenerate = async () => {
    if (!mealType || !diningHall || !calorieGoal) {
      setError("⚠️ Please fill in all fields before generating a meal plan.");
      setShowResponse(false);
      return;
    }

    setError("");
    setShowResponse(false);

    try {
      const res = await fetch("YOUR_LAMBDA_ENDPOINT_HERE", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealType, diningHall, calorieGoal }),
      });

      const data = await res.json();
      setResponse(data.message || "No response from backend.");
      setShowResponse(true);
    } catch (err) {
      console.error(err);
      setResponse("Error fetching response.");
      setShowResponse(true);
    }
  };

  const handleBack = () => {
    setShowResponse(false);
    setResponse("");
  };

  return (
    <div className="App">
      <h1>
        B<span style={{ color: "#2774AE" }}>Healthy</span>
      </h1>

      {!showResponse ? (
        <>
          <div className="input-row">
            <Meals mealType={mealType} setMealType={setMealType} />
            <DiningHalls diningHall={diningHall} setDiningHall={setDiningHall} />
            <Calories calorieGoal={calorieGoal} setCalorieGoal={setCalorieGoal} />
          </div>

          <button onClick={handleGenerate} className="generate-btn">
            Generate Meal Plan
          </button>

          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <div className="response-container">
          <button onClick={handleBack} className="back-arrow">
            ← Back
          </button>
          <GeneratedResponse response={response} />
        </div>
      )}
    </div>
  );
}

export default App;
