import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavigationBar from "./components/Nav_bar.jsx";
import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Clothing from "./components/Cloth.jsx";
import Shoes from "./components/Shoes.jsx";
import Accessories from "./components/Accessories.jsx";
import Sale from "./components/Sale.jsx";
import Cart from "./components/Carty.jsx"; // Import Cart Component
import "./App.css";

function App() {
  const [cart, setCart] = useState([]); // Cart state

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]); 
  };

  // Function to remove an item from the cart
  const removeFromCart = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };

  // Function to clear the cart
  const clearCart = () => {
    setCart([]);
  };

  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop addToCart={addToCart} />} />
        <Route path="/clothing" element={<Clothing addToCart={addToCart} />} />
        <Route path="/shoes" element={<Shoes addToCart={addToCart} />} />
        <Route path="/accessories" element={<Accessories addToCart={addToCart} />} />
        <Route path="/sale" element={<Sale addToCart={addToCart} />} />
      </Routes>

      {/* Floating Cart Button */}
      <Cart cartItems={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
    </Router>
  );
}

export default App;
