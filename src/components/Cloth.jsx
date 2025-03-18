import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure styles are properly imported

const Clothing = ({ addToCart }) => {
  const [clothing, setClothing] = useState([]);

  // Async function to fetch clothing data
  const fetchClothingData = async () => {
    try {
      // Use BASE_URL for correct path resolution in GitHub Pages
      const response = await fetch(`${import.meta.env.BASE_URL}db.json`);
      if (!response.ok) throw new Error("Failed to fetch clothing data");

      const json = await response.json();
      setClothing(json.clothing); // Access only the clothing section
    } catch (error) {
      console.error("Error fetching clothing data:", error);
    }
  };

  useEffect(() => {
    fetchClothingData(); // Fetch data on component mount
  }, []);

  return (
    <div className="clothing-container">
      <h2>Clothing Collection</h2>
      {clothing.length > 0 ? (
        clothing.map((category, index) => (
          <div key={index} className="clothing-category">
            <h3>{category.type}</h3>
            <div className="clothing-grid">
              {category.items.map((item, i) => (
                <div key={i} className="clothing-item">
                  <h4>{item.name}</h4>
                  <p>Price: ${item.price}</p>
                  <p>Available Colors: {item.colors.join(", ")}</p>
                  <div className="clothing-images">
                    {item.images.map((img, j) => (
                      <img
                        key={j}
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
          </div>
        ))
      ) : (
        <p>Loading clothing items...</p>
      )}
    </div>
  );
};

export default Clothing;
