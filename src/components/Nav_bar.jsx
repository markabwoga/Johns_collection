import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css"; // Import CSS

const NavigationBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="logo">John's Collection</div>

      {/* Hamburger Icon for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Navigation Links */}
      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li><Link to="/" className="nav-link">Home</Link></li>
        <li><Link to="/shop" className="nav-link">Shop</Link></li>

        {/* Clothing Dropdown */}
        <li className="dropdown">
          <Link to="/clothing" className="nav-link">Clothing ⬇</Link>
          <ul className="dropdown-menu">
            <li><Link to="/clothing/tshirts" className="dropdown-link">T-Shirts</Link></li>
            <li><Link to="/clothing/shirts" className="dropdown-link">Shirts</Link></li>
            <li><Link to="/clothing/hoodies" className="dropdown-link">Hoodies</Link></li>
          </ul>
        </li>

        {/* Shoes Dropdown */}
        <li className="dropdown">
          <Link to="/shoes" className="nav-link">Shoes ⬇</Link>
          <ul className="dropdown-menu">
            <li><Link to="/shoes/sneakers" className="dropdown-link">Sneakers</Link></li>
            <li><Link to="/shoes/boots" className="dropdown-link">Boots</Link></li>
          </ul>
        </li>

        {/* Accessories Dropdown */}
        <li className="dropdown">
          <Link to="/accessories" className="nav-link">Accessories ⬇</Link>
          <ul className="dropdown-menu">
            <li><Link to="/accessories/sunglasses" className="dropdown-link">Sunglasses</Link></li>
            <li><Link to="/accessories/belts" className="dropdown-link">Belts</Link></li>
          </ul>
        </li>

        <li><Link to="/sale" className="sale-link">Sale</Link></li>
      </ul>

      {/* Icons (Search, Cart, Account) */}
      <div className="icons">
        <span className="icon">🔍</span>
        <span className="icon">🛒</span>
        <span className="icon">👤</span>
      </div>
    </nav>
  );
};

export default NavigationBar;
