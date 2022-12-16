import React from "react";
import api from "../utils/api.utils";
import { useState, useEffect } from "react";
import { DefendantCard, Button } from "../components/Shared";
import { useParams } from "react-router-dom";

export const DefendantProcess = () => {
  const { id } = useParams();

  const [lawSuit, setLawSuit] = useState([]);
  const [defendant, setDefendant] = useState("");

  useEffect(() => {
    const getDefendant = async () => {
      try {
        const data = await api.getOneDefendant(id);
        setDefendant(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDefendant();
  }, [id]);
  useEffect(() => {
    const getAllProcessDefendant = async () => {
      try {
        const data = await api.getDefendantProcess(id);

        setLawSuit(data);
      } catch (error) {
        console.log(error, "Error to get defendants");
      }
    };
    getAllProcessDefendant();
  }, [id]);
  return (
    <div>
      <Button to={`/defendant/${id}/add-process`}>+</Button>
      <h3 style={{ display: "flex", flexDirection: "column" }}>
        <span>All process from</span>
        <span>{defendant.full_name}</span>
        <span>({defendant.cnpj})</span>
      </h3>
      {lawSuit.length === 0 && (
        <p>None process for this defendant was created!</p>
      )}
      {lawSuit.map((process, index) => {
        return (
          <DefendantCard key={index} to={`/process/${process._id}`}>
            <i className="bi bi-folder"></i>
            <p>
              Date:{" "}
              <b>
                {new Date(process.dateProcess).toLocaleDateString("pt-br", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric"
                })}
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
