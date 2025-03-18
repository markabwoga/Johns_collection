import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure styles are included

const Shoes = ({ addToCart }) => {
  const [shoes, setShoes] = useState([]);

  // Fetch Shoes data
  const fetchShoesData = async () => {
    try {
      // Use BASE_URL for correct path resolution in GitHub Pages
      const response = await fetch(`${import.meta.env.BASE_URL}db.json`);
      if (!response.ok) throw new Error("Failed to fetch Shoes data");

      const json = await response.json();
      setShoes(json.shoes); // Directly setting shoes array
    } catch (error) {
      console.error("Error fetching Shoes data:", error);
    }
  };

  useEffect(() => {
    fetchShoesData();
  }, []);

  return (
    <div className="shoes-container">
      <h2>Shoes Collection</h2>
      {shoes.length > 0 ? (
        <div className="shoes-grid">
          {shoes.map((shoe, index) => (
            <div key={index} className="shoes-item">
              <h3>{shoe.name}</h3>
              <p>Price: ${shoe.price}</p>
              <p>Available Colors: {shoe.colors.join(", ")}</p>
              <div className="shoes-images">
                {shoe.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${import.meta.env.BASE_URL}images/${img}`} // Corrected for Vite + GitHub Pages
                    alt={shoe.name}
                    width="120"
                    height="200"
                  />
                ))}
              </div>
              <button className="addToCartDiv" onClick={() => addToCart(shoe)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Shoes items...</p>
      )}
    </div>
  );
};

export default Shoes;
