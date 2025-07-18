import React from 'react';
import '../assets/CSS/HamburgerMenu.css';

const HamburgerMenu = ({ onClick }) => (
  <button className="hamburger-menu" onClick={onClick} aria-label="Open Sidebar">
    <span></span>
    <span></span>
    <span></span>
  </button>
);

export default HamburgerMenu;
