import React, { useState, useEffect } from "react";
import "../App.css"; // Ensure styles are included

const Shoes = ({ addToCart }) => {
  const [shoes, setShoes] = useState([]);

  // Fetch Shoes data
  const fetchShoesData = async () => {
    try {
      const response = await fetch("/db.json"); // Adjust path if needed
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
                  <img key={i} src={`/images/${img}`} alt={shoe.name} />
                ))}
              </div>
              <button className="addToCartDiv" onClick={() => addToCart(shoe)}>Add to Cart</button>
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
