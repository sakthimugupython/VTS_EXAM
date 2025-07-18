import React, { useState } from 'react';
import '../assets/CSS/Sidebar.css';
import logo from '../assets/images/vtslogo.png'
import { IoIosSpeedometer } from "react-icons/io";
import { FaPencilAlt } from "react-icons/fa";
import { IoCode } from "react-icons/io5";
import { IoMdSchool } from "react-icons/io";
import { LuSearchCheck } from "react-icons/lu";
import { Link } from "react-router-dom";

const navItems = [
  { label: 'Overview', icon: <IoIosSpeedometer /> },
  { label: 'Designing', icon: <FaPencilAlt /> },
  { label: 'Development', icon: <IoCode /> },
  { label: 'Exam', icon: <IoMdSchool /> },
  { label: 'Result', icon: <LuSearchCheck /> },
];

const Sidebar = ({ isOpen, onClose, isCompact }) => {
  if (isCompact && isOpen) {
    document.body.classList.add('sidebar-open');
  } else {
    document.body.classList.remove('sidebar-open');
  }
  return (
    <>
      {isCompact && isOpen && <div className="sidebar-overlay" onClick={onClose}></div>}
      <nav className={`sidebar${isOpen ? ' open' : ''}`}>
        {isCompact && isOpen && (
          <button className="sidebar-close text-dark fs-5" onClick={onClose}>&times;</button>
        )}
        <div className="sidebar-header d-flex justify-content-center align-items-center px-3 py-2">
          <img src={logo} alt="Logo" className="sidebar-logo" />
          <h2 className='fs-5 pe-3 pt-2 fw-semibold'>VTS Exam Portal</h2>
        </div>
        <ul className="sidebar-nav">
          {navItems.map((item) => {
            let path = `/${item.label.toLowerCase()}`;
            if (item.label === 'Overview') path = '/home';
            const isActive = window.location.pathname === path;
            return (
              <li key={item.label} className={`sidebar-nav-item${isActive ? ' active' : ''}`}>
                <Link to={path} className='text-decoration-none text-white' style={{ display: 'flex', alignItems: 'center', textDecoration: 'none', width: '100%' }}>
                  <span className="sidebar-icon">{item.icon}</span>
                  <span className="sidebar-label">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
