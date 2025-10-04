import React, { useState } from "react";
import "../App.css";

const Calories = () => {
  const [calories, setCalories] = useState("");

  const handleChange = (e) => {
    setCalories(e.target.value);
  };

  return (
    <div className="calories-container">
      <p className="calories-title">Calories</p>
      <input
        type="number"
        value={calories}
        onChange={handleChange}
        placeholder="Enter calorie target"
        className="calories-input"
      />
    </div>
  );
};

// const styles = {
//   container: {
//     width: "200px",
//     height: "130px",
//     backgroundColor: "#f8f8f8",
//     borderRadius: "12px",
//     boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     padding: "10px",
//   },
//   title: {
//     fontSize: "16px",
//     fontWeight: "600",
//     marginBottom: "10px",
//   },
//   input: {
//     width: "80%",
//     padding: "6px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontSize: "14px",
//     textAlign: "center",
//   },
// };

export default Calories;
