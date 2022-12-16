import React from "react";
import api from "../utils/api.utils";
import { useState, useEffect } from "react";
import { DefendantCard, Button, MsgSucess } from "../components/Shared";
import { useParams } from "react-router-dom";

export const DefendantProcess = ({
  message,
  setMessage,
  loading,
  setLoading,
}) => {
  const { id } = useParams();

  const [lawSuit, setLawSuit] = useState([]);
  const [defendant, setDefendant] = useState("");

  useEffect(() => {
    const getDefendant = async () => {
      try {
        const data = await api.getOneDefendant(id);
        setDefendant(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDefendant();
  }, [id, setLoading]);
  useEffect(() => {
    const getAllProcessDefendant = async () => {
      try {
        const data = await api.getDefendantProcess(id);

        setLawSuit(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error to get defendants");
      }
    };
    getAllProcessDefendant();
  }, [id, setLoading]);
  return !loading ? (
    <div>
      <Button to={`/defendant/${id}/add-process`}>+</Button>
      {message !== null && <MsgSucess>{message}</MsgSucess>}
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
                  year: "numeric",
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
  ) : (
    <div>Loading...</div>
  );
};
