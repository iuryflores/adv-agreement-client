import React, { useState, useEffect } from "react";

import apiUtils from "../utils/api.utils";
import { Button, DefendantCard } from "../components/Shared";

export const Defendant = () => {
  const [defendants, setDefendants] = useState([]);

  const getDefendants = async () => {
    try {
      const data = await apiUtils.getDefendants();
      setDefendants(data);
    } catch (error) {
      console.log(error, "Error to get defendants");
    }
  };

  useEffect(() => {
    getDefendants();
  }, []);
  return (
    <div className="wrap">
      {!defendants !== "" ? (
        <h3>All defendants</h3>
      ) : (
        <h3> No defendant registred!</h3>
      )}
      <Button to="/add-defendant">+</Button>
      {defendants.map((defendant, index) => (
        <DefendantCard to={`/defendant/${defendant._id}`} key={index}>
          <span>
            <i className="bi bi-buildings"></i> <b>{defendant.full_name}</b> -
            (CNPJ: {defendant.cnpj})
          </span>
          <i className="bi bi-box-arrow-right"></i>
        </DefendantCard>
      ))}
    </div>
  );
};
