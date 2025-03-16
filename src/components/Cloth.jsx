import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure you have styles defined in your CSS file

const Clothing = ({ addToCart }) => {
  const [clothing, setClothing] = useState([]);

  // Async function to fetch clothing data
  const fetchClothingData = async () => {
    try {
      const response = await fetch("/db.json"); // Adjust path if needed
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
                      <img key={j} src={`/images/${img}`} alt={item.name} />
                    ))}
                  </div>
                  <button onClick={() => addToCart(item)}>Add to Cart</button>
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
