import React, { useState } from "react";

const DiningHalls = () => {
  const halls = [
    {
      name: "De Neve Dining",
      image: "https://cdn-icons-png.flaticon.com/512/3595/3595455.png",
    },
    {
      name: "Bruin Plate",
      image: "https://cdn-icons-png.flaticon.com/512/857/857681.png",
    },
    {
      name: "Epicuria at Covel",
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % halls.length);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.title}>{halls[currentIndex].name}</p>
        <img
          src={halls[currentIndex].image}
          alt={halls[currentIndex].name}
          style={styles.image}
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
  card: {
    position: "relative",
    width: "180px",
    height: "200px",
    backgroundColor: "#f9f9f9",
    borderRadius: "12px",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
  },
  title: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "10px",
    textAlign: "center",
  },
  image: {
    width: "90px",
    height: "90px",
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

export default DiningHalls;
