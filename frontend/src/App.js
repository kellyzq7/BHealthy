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

    // Mock menu data for demo
    const mockMenu = [
      { item: "Grilled Chicken Breast", calories: 250, protein: 35, carbs: 0, fat: 10 },
      { item: "Brown Rice", calories: 200, protein: 4, carbs: 45, fat: 1 },
      { item: "Steamed Broccoli", calories: 50, protein: 4, carbs: 10, fat: 0 },
      { item: "Quinoa Salad", calories: 180, protein: 6, carbs: 30, fat: 5 },
      { item: "Grilled Salmon", calories: 300, protein: 40, carbs: 0, fat: 15 },
      { item: "Sweet Potato", calories: 150, protein: 2, carbs: 35, fat: 0 },
      { item: "Greek Yogurt", calories: 120, protein: 15, carbs: 10, fat: 5 },
      { item: "Mixed Vegetables", calories: 80, protein: 3, carbs: 15, fat: 1 }
    ];

    try {
      const res = await fetch("https://looo62rg3afi7sqnsa7wnuzglq0nrtlo.lambda-url.us-east-1.on.aws/meal-planner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mealType, diningHall, calorieGoal }),
      });

      const data = await res.json();
      setResponse(data);
      setShowResponse(true);
    } catch (err) {
      console.error(err);
      setResponse("Error generating meal plan.");
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
        {/* <p> Because you shoudln't have to do math to be healthy! </p> */}
      </h1>

      {!showResponse ? (
        <>
          <div className="input-row">
            <Meals mealType={mealType} setMealType={setMealType} />
            <DiningHalls
              diningHall={diningHall}
              setDiningHall={setDiningHall}
            />
            <Calories
              calorieGoal={calorieGoal}
              setCalorieGoal={setCalorieGoal}
            />
          </div>

          <button onClick={handleGenerate} className="generate-button">
            Generate Meal Plan
          </button>

          {error && <p className="error-message">{error}</p>}
        </>
      ) : (
        <div className="response-container">
          <GeneratedResponse response={response} />
          <button onClick={handleBack} className="back-button">
            ← Back
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
