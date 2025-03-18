import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure styles are included

const Accessories = ({ addToCart }) => {
  const [accessories, setAccessories] = useState([]);

  // Fetch Accessories data
  const fetchAccessoriesData = async () => {
    try {
      // Use BASE_URL for correct path resolution in GitHub Pages
      const response = await fetch(`${import.meta.env.BASE_URL}db.json`);
      if (!response.ok) throw new Error("Failed to fetch Accessories data");

      const json = await response.json();
      setAccessories(json.accessories); // Directly setting accessories array
    } catch (error) {
      console.error("Error fetching Accessories data:", error);
    }
  };

  useEffect(() => {
    fetchAccessoriesData();
  }, []);

  return (
    <div className="accessories-container">
      <h2>Accessories Collection</h2>
      {accessories.length > 0 ? (
        <div className="accessories-grid">
          {accessories.map((item, index) => (
            <div key={index} className="accessories-item">
              <h3>{item.name}</h3>
              <p>Price: ${item.price}</p>
              <p>Available Colors: {item.colors.join(", ")}</p>
              <div className="accessories-images">
                {item.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}images/${img}`} // Corrected for Vite + GitHub Pages
                    alt={item.name}
                    width="120"
                    height="200"
                  />
                ))}
              </div>
              <button className="addToCartDiv" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Accessories items...</p>
      )}
    </div>
  );
};

export default Accessories;
