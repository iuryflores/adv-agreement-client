import React, { useState, useEffect } from "react";

import apiUtils from "../utils/api.utils";
import { Button } from "../components/Shared";

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
    <div>
      <Button to="/add-defendant">+ Add defendant +</Button>
      {defendants.map((defendant) => {
        return defendant.full_name;
      })}
    </div>
  );
};
