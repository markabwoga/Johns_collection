import React, { useState } from "react";
import "../App.css";

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Cart Icon */}
      <div className="cart-icon" onClick={() => setIsOpen(!isOpen)}>
        🛒 <span className="cart-count">{cartItems.length}</span>
      </div>

      {/* Cart Modal */}
      {isOpen && (
        <div className="cart-modal">
          <h3>Your Cart</h3>
          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <strong>{item.name}</strong> - ${item.price}
                  <button onClick={() => removeFromCart(index)}>❌</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}

          <button onClick={clearCart} disabled={cartItems.length === 0}>
            Clear Cart
          </button>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      )}
    </>
  );
};

export default Cart;
