import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/iury.png";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <span>© 2022 | Iury Flores </span>
        <img className="logo" src={logo} alt="Iury Flores" />
      </footer>
      <div className="menu-footer">
        <ul>
          <Link to="/process">
            <i class="bi bi-folder"></i>PROCESS
          </Link>
          <Link to="/defendant">
            <i class="bi bi-buildings-fill"></i>DEFENDANT
          </Link>
          <Link to="/deals">
            <i class="bi bi-arrow-left-right"></i>DEALS
          </Link>
          <Link to="/parcels">
            <i class="bi bi-currency-dollar"></i>PARCELS
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Footer;
