import React from "react";
import "../Card.css";

function GeneratedResponse({ response }) {
  if (typeof response === 'string') {
    return (
      <div>
        <h2>Generated Meal Plan</h2>
        <p>{response}</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Generated Meal Plan</h2>
      <div className="meal-plan">
        <h3>Recommended Meals:</h3>
        <ul>
          {response.meals?.map((meal, index) => (
            <li key={index}>{meal}</li>
          ))}
        </ul>
        
        <div className="nutrition-summary">
          <h3>Nutrition Summary:</h3>
          <p><strong>Total Calories:</strong> {response.total_calories}</p>
          <p><strong>Protein:</strong> {response.total_protein}g</p>
          <p><strong>Carbs:</strong> {response.total_carbs}g</p>
          <p><strong>Fat:</strong> {response.total_fat}g</p>
        </div>
      </div>
    </div>
  );
}

export default GeneratedResponse;
