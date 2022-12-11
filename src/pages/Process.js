import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import {
  MsgError,
  MsgSucess,
  Button,
  DefendantCard
} from "../components/Shared";

export const Process = ({ message, setMessage, loading, setLoading }) => {
  const [lawsuit, setLawSuit] = useState([]);

  const getLawSuit = async () => {
    try {
      const data = await api.getLawSuit();
      setLawSuit(data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error to get law suit");
    }
  };

  useEffect(() => {
    getLawSuit();
  }, []);
  let dateProcess;
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);
  return !loading ? (
    <div className="wrap">
      {message && <MsgSucess>{message}</MsgSucess>}
      {!lawsuit !== "" ? (
        <h3>All Process</h3>
      ) : (
        <h3> No defendant registred!</h3>
      )}
      <Button to="/add-defendant">+</Button>
      {lawsuit.map((process, index) => (
        <DefendantCard to={`/process/${process._id}`} key={index}>
          <p>
            <i className="bi bi-folder"></i> Date:{" "}
            <b>
              {
                (dateProcess = new Date(
                  process.dateProcess
                ).toLocaleDateString("pt-br", {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric"
                }))
              }
            </b>
          </p>
          <p>
            Number: <b>{process.processNumber}</b>
          </p>
          <p>
            Defendant: <b>{process.defendantId.full_name}</b>
          </p>
          <p>
            Complainant: <b>{process.complainantName}</b>
          </p>
          <i className="bi bi-box-arrow-right"></i>
        </DefendantCard>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};
