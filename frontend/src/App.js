import React, { useState } from "react";
import "./App.css";
import Meals from "./components/Meals";
import GenerateButton from "./components/GenerateButton";
import DiningHalls from "./components/DiningHalls";
import Calories from "./components/Calories";

function App() {
  const [mealType, setMealType] = useState("breakfast");
  const [calories, setCalories] = useState("");
  const [diningHall, setDiningHall] = useState("Dining Hall A");
  const [mealPlan, setMealPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!mealType || !diningHall || !calories) {
      setError("Please fill in all fields before generating a meal plan.");
      return;
    }

    setError("");
    setLoading(true);

    // Mock AI response, replace with backend
    setTimeout(() => {
      const mockPlan = {
        diningHall,
        mealType,
        dishes: [
          { name: "Omelette", calories: 300, protein: 20, carbs: 10 },
          { name: "Toast", calories: 150, protein: 5, carbs: 30 },
          { name: "Carrots", calories: 50, protein: 1, carbs: 12 },
          { name: "Ice Cream", calories: 200, protein: 3, carbs: 30 },
        ],
        totals: { calories: 700, protein: 29, carbs: 82 },
      };
      setMealPlan(mockPlan);
      setLoading(false);
    }, 1000);
  };

  return (
    <>
    <div className="App">
      <header>
        <h1>
          B<span style={{ color: "#2774AE" }}>Healthy</span>
        </h1>
        <p>Because you shouldn't have to do math to stay healthy!</p>
      </header>

      <form onSubmit={handleSubmit} className="meal-form">
        {/* Meal of the day */}
        <label>
          Meal of the Day:
          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </label>

        {/* Dining hall selection */}
        <label>
          Dining Hall:
          <select
            value={diningHall}
            onChange={(e) => setDiningHall(e.target.value)}
          >
            <option value="">-- Select --</option>
            <option value="De Neve Dining">De Neve Dining</option>
            <option value="Bruin Plate">Bruin Plate</option>
            <option value="Epicuria at Covel">Epicuria at Covel</option>
          </select>
        </label>

        {/* Calorie goal */}
        <label>
          Calorie Goal:
          <input
            type="number"
            placeholder="Enter calorie target"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
          />
        </label>

        {error && <p className="error">{error}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Generating..." : "Generate Meal Plan"}
        </button>
      </form>

      {!loading && mealPlan && (
        <div className="meal-plan">
          <h2>
            Your {mealPlan.mealType} at {mealPlan.diningHall}
          </h2>
          <ul>
            {mealPlan.dishes.map((dish, idx) => (
              <li key={idx}>
                {dish.name} — {dish.calories} cal, {dish.protein}g protein,{" "}
                {dish.carbs}g carbs
              </li>
            ))}
          </ul>
          <h3>
            Totals: {mealPlan.totals.calories} cal,{" "}
            {mealPlan.totals.protein}g protein, {mealPlan.totals.carbs}g carbs
          </h3>
        </div>
      )}
    </div>

    <div style={{ display: "flex", gap: "20px", padding: "20px", justifyContent: "center" }}>
      <Meals  />
      <DiningHalls />
      <Calories />
    </div>

    <div style={{ display: "flex", gap: "20px", padding: "20px", justifyContent: "center" }}>
      <GenerateButton  />
    </div>

    </>

  );


}

export default App;
