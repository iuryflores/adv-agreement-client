import React from "react";

import logo from "../images/iury.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <span>© 2022 | Iury Flores </span>
      <img className="logo" src={logo} alt="Iury Flores" />
    </footer>
  );
};

export default Footer;
