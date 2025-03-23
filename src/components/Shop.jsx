import React, { useState, useEffect } from "react";
import axios from "axios";

const Shop = ({ addToCart }) => {
  const [items, setItems] = useState([]);
  const JSONBIN_URL = "https://api.jsonbin.io/v3/b/67df5b688561e97a50f1077f";
  const JSONBIN_KEY = "$2a$10$XCJidaWnabIGUw50h6mMVO8lOAZ2g7tansfd4vOGkHguTiquocJIK"; // ⚠️ Keep this secret in production!

  // Function to shuffle array
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Fetch data from JSONBin.io
  const fetchShopData = async () => {
    try {
      const response = await axios.get(JSONBIN_URL, {
        headers: {
          "X-Master-Key": JSONBIN_KEY, // Required since the bin is private
        },
      });

      const json = response.data.record; // JSONBin wraps data inside `record`

      // Extract items from clothing, shoes, and accessories
      const clothingItems = json.clothing?.flatMap((category) => category.items) || [];
      const shoesItems = json.shoes || [];
      const accessoriesItems = json.accessories || [];

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
              <p>Available Colors: {item.colors?.join(", ") || "N/A"}</p>
              <div>
                {item.images?.map((img, i) => (
                  <img
                    key={i}
                    src={img} // Assuming images are hosted online
                    alt={item.name}
                    width="120"
                    height="200"
                  />
                )) || "No Image"}
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
