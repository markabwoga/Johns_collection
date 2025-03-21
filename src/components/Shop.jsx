import React, { useState, useEffect } from "react";

const Shop = ({ addToCart }) => {
  const [items, setItems] = useState([]);

  // Function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch all data from db.json
  const fetchShopData = async () => {
    try {
      // Fetch db.json using Vite-compatible path
      const response = await fetch(`${import.meta.env.BASE_URL}db.json`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const json = await response.json();

      // Extract items from clothing, shoes, and accessories
      const clothingItems = json.clothing.flatMap(category => category.items);
      const shoesItems = json.shoes;
      const accessoriesItems = json.accessories;

      // Combine all items into one array
      const allItems = [...clothingItems, ...shoesItems, ...accessoriesItems];

      // Shuffle items before displaying
      setItems(shuffleArray(allItems));
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  useEffect(() => {
    fetchShopData(); // Fetch data on component mount
  }, []);

  return (
    <div>
      <h2>Shop Collection</h2>
      {items.length > 0 ? (
        <div className="shop-grid">
          {items.map((item, index) => (
            <div key={index} className="shop-item">
              <h4>{item.name}</h4>
              <p>Price: ${item.price}</p>
              <p>Available Colors: {item.colors.join(", ")}</p>
              <div>
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
        <p>Loading shop items...</p>
      )}
    </div>
  );
};

export default Shop;
