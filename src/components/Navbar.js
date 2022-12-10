import React from "react";

import "./Navbar.css";
import { LinkNav } from "./Shared";

const Navbar = () => {
  return (
    <nav>
      <h3>
        <i className="bi bi-folder-check"></i> Adv Manager
      </h3>
      <ul className="ul-top">
        <LinkNav to="process"><i class="bi bi-folder"></i> PROCESS</LinkNav>
        <LinkNav to="defendant"><i class="bi bi-buildings-fill"></i> DEFENDANT</LinkNav>
        <LinkNav to="deals"><i class="bi bi-arrow-left-right"></i> DEALS</LinkNav>
        <LinkNav to="parcels"><i class="bi bi-currency-dollar"></i> PARCELS</LinkNav>
      </ul>
    </nav>
  );
};

export default Navbar;
