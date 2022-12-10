import React from "react";
import api from "../utils/api.utils";
import { useState, useEffect } from "react";
import { MsgSucess, MsgError, DefendantCard } from "../components/Shared";
import { useParams } from "react-router-dom";

export const DefendantProcess = ({ message, setMessage }) => {
  const { id } = useParams();

  const [lawSuit, setLawSuit] = useState([]);
  const [error, setError] = useState(null);

  const getAllProcessDefendant = async () => {
    try {
      const data = await api.getDefendantProcess(id);
      setLawSuit(data);
    } catch (error) {
      console.log(error, "Error to get defendants");
    }
  };
  useEffect(() => {
    getAllProcessDefendant();
  }, []);
  return (
    <div>
      {lawSuit.map((process, index) => {
        return (
          <DefendantCard key={index}>
            <p>
              Process number: <b> {process.processNumber}</b>
            </p>
            <p>
              Complainant: <b> {process.complainantName}</b>
            </p>
            <p>
              Defendant: <b> {process.defendantId.full_name}</b>
            </p>
          </DefendantCard>
        );
      })}
    </div>
  );
};
