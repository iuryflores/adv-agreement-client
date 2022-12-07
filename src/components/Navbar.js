import React from "react";

import "./Navbar.css";
import { LinkNav } from "./Shared";

const Navbar = () => {
  return (
    <nav>
      <h3>
        <i className="bi bi-folder-check"></i> Adv Manager
      </h3>
      <ul>
        <LinkNav to="process">PROCESS</LinkNav>
        <LinkNav to="defendant">DEFENDANT</LinkNav>
        <LinkNav to="deals">DEALS</LinkNav>
        <LinkNav to="parcels">PARCELS</LinkNav>
      </ul>
    </nav>
  );
};

export default Navbar;
