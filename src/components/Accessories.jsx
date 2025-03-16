import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure styles are included

const Accessories = ({ addToCart }) => {
  const [accessories, setAccessories] = useState([]);

  // Fetch Accessories data
  const fetchAccessoriesData = async () => {
    try {
      const response = await fetch("/db.json"); // Adjust path if needed
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
                  <img key={i} src={`/images/${img}`} alt={item.name} />
                ))}
              </div>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
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
