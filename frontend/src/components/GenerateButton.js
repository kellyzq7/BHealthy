import React from "react";

export default function GenerateButton() {
  const style = {
    width: "200px",
    height: "100px",
    borderRadius: "50px",
    backgroundColor: "#4CAF50",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontName: "Helios Extended",
    fontSize: "18px",
    
  };

  return <div style={style}>Generate Meal Plan</div>;
}