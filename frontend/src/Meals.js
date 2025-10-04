// import React from "react";

// export default function Meals() {
//   const style = {
//     width: "200px",
//     height: "100px",
//     borderRadius: "10px",
//     backgroundColor: "#4CAF50",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     color: "#fff",
//     fontSize: "18px",
//   };

//   return <div style={style}>Meals</div>;
// }

import React, { useState } from "react";

const Meals = () => {
  const meals = [
    { name: "Breakfast", image: "https://cdn-icons-png.flaticon.com/512/1046/1046784.png" },
    { name: "Lunch", image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png" },
    { name: "Dinner", image: "https://cdn-icons-png.flaticon.com/512/1046/1046857.png" },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % meals.length);
  };

  return (
    <div style={styles.container}>
      <div style={styles.mealBox}>
        <p style={styles.mealName}>{meals[currentIndex].name}</p>
        <img
          src={meals[currentIndex].image}
          alt={meals[currentIndex].name}
          style={styles.mealImage}
        />
        <button onClick={handleNext} style={styles.nextButton}>
          ➡
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "20px",
  },
  mealBox: {
    position: "relative",
    width: "150px",
    height: "180px",
    backgroundColor: "#f2f2f2",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
  mealName: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
  },
  mealImage: {
    width: "80px",
    height: "80px",
    objectFit: "contain",
  },
  nextButton: {
    position: "absolute",
    right: "8px",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Meals;
