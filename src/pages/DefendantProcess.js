import React from "react";
import api from "../utils/api.utils";
import { useState, useEffect } from "react";
import { DefendantCard } from "../components/Shared";
import { useParams } from "react-router-dom";

export const DefendantProcess = ({ message, setMessage }) => {
  const { id } = useParams();

  const [lawSuit, setLawSuit] = useState([]);
  const [defendant, setDefendant] = useState("");

  const getDefendant = async () => {
    try {
      const data = await api.getOneDefendant(id);
      setDefendant(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllProcessDefendant = async () => {
    try {
      const data = await api.getDefendantProcess(id);
      setLawSuit(data);
    } catch (error) {
      console.log(error, "Error to get defendants");
    }
  };
  useEffect(() => {
    getDefendant();
  }, []);
  useEffect(() => {
    getAllProcessDefendant();
  });
  return (
    <div>
      <h3 style={{ display: "flex", flexDirection: "column" }}>
        <span>All process from</span>
        <span>{defendant.full_name}</span>
        <span>({defendant.cnpj})</span>
      </h3>
      {lawSuit.map((process, index) => {
        return (
          <DefendantCard key={index} to={`/process/${process._id}`}>
            <i className="bi bi-folder"></i>
            <p>
              Date:{" "}
              <b>
                {
                  (process.dateProcess = new Date(
                    process.dateProcess
                  ).toLocaleDateString())
                }
              </b>
            </p>
            <p>
              Process number: <b> {process.processNumber}</b>
            </p>
            <p>
              Complainant: <b> {process.complainantName}</b>
            </p>
            <i className="bi bi-box-arrow-right"></i>
          </DefendantCard>
        );
      })}
    </div>
  );
};
