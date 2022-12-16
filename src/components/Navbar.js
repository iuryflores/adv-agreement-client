import React from "react";

import { LinkNav } from "./Shared";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <h3>
        <i className="bi bi-folder-check"></i>Adv Manager
      </h3>
      <ul className="ul-top">
        <LinkNav to="defendant">
          <i className="bi bi-buildings-fill"></i> DEFENDANT
        </LinkNav>
        <LinkNav to="process">
          <i className="bi bi-folder"></i> PROCESS
        </LinkNav>
        <LinkNav to="deals">
          <i className="bi bi-arrow-left-right"></i> DEALS
        </LinkNav>
        <LinkNav to="parcels">
          <i className="bi bi-currency-dollar"></i> PARCELS
        </LinkNav>
        <span></span>
      </ul>
      <button
        style={{
          position: "absolute",
          right: "50px",
          background: "none",
          border: "none",
          color: "#0f52ba"
        }}
        onClick={logout}
      >
        Logout <i className="bi bi-box-arrow-right"></i>
      </button>
    </nav>
  );
};

export default Navbar;
