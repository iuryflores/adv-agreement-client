import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.utils.js";
import { ButtonView, ProcessCard, MsgSucess } from "../components/Shared.js";

export const ViewProcess = ({ message, setMessage, loading, setLoading }) => {
  const { id } = useParams();

  const [process, setProcess] = useState(id);
  const [defendant, setDefendant] = useState("");

  const getProcess = async () => {
    try {
      const data = await api.getProcess(id);

      setProcess(data);
      setDefendant(data.defendantId);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProcess();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);
 
  
  let dateProcess = new Date(process.dateProcess).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  return !loading ? (
    <>
      {message && <MsgSucess>{message}</MsgSucess>}
      <h3>Process view</h3>

      <ProcessCard>
        <span>
          Process date: <b> {dateProcess}</b>
        </span>
        <span>
          Process number: <b> {process.processNumber}</b>
        </span>
        <span>
          Defendant: <b> {defendant.full_name}</b>
        </span>
        <span>
          Defendant CNPJ: <b> {defendant.cnpj}</b>
        </span>
        <span>
          Complainant: <b> {process.complainantName}</b>
        </span>
        <span>
          Subject: <b> {process.subject}</b>
        </span>
        <span>
          Jurisdiction: <b> {process.jurisdiction}</b>
        </span>
        <span>
          Judgment: <b> {process.judgment}</b>
        </span>
        <span>
          Status: <b> {process.status === true && "Active"}</b>
        </span>
      </ProcessCard>

      <ButtonView to={`/process/${id}/add-deal`} style={{ marginTop: "50px" }}>
        Add Deal
      </ButtonView>
    </>
  ) : (
    <div>loading...</div>
  );
};
