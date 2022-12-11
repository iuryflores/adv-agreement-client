import React from "react";
import { Link } from "react-router-dom";

import logo from "../images/iury.png";

const Footer = () => {
  return (
    <>
      <footer>
        <span>© 2022 | Iury Flores </span>
        <img className="logo" src={logo} alt="Iury Flores" />
      </footer>
      <div className="menu-footer">
        <ul>
          <Link to="/defendant">
            <i className="bi bi-buildings-fill"></i>DEFENDANT
          </Link>
          <Link to="/process">
            <i className="bi bi-folder"></i>PROCESS
          </Link>
          <Link to="/deals">
            <i className="bi bi-arrow-left-right"></i>DEALS
          </Link>
          <Link to="/parcels">
            <i className="bi bi-currency-dollar"></i>PARCELS
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Footer;
