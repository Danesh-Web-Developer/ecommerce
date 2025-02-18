import React from "react";
import { FaTachometerAlt, FaBox, FaUsers, FaChartLine, FaCogs } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="sidebar">
      <h3 className="text-white text-center">Dashboard</h3>
      <a href="#">
        <FaTachometerAlt /> Overview
      </a>
      <a href="#">
        <FaBox /> Products
      </a>
      <a href="#">
        <FaUsers /> Customers
      </a>
      <a href="#">
        <FaChartLine /> Sales
      </a>
      <a href="#">
        <FaCogs /> Settings
      </a>
    </div>
  );
}

export default Sidebar;
