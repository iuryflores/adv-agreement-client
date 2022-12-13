import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api.utils.js";
import { ButtonView, ProcessCard, MsgError, MsgSucess } from "../components/Shared.js";

export const ViewProcess = ({ message, setMessage, loading, setLoading }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [process, setProcess] = useState(id);
  const [defendant, setDefendant] = useState("");
  const [error, setError] = useState(null);

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

  const DeleteOneProcess = async () => {
    try {
      await api.deleteProcess(id);
      navigate('/process')
    } catch (error) {
      showMessage(error);
    }
  };

  const showMessage = (error) => {
    setError(error);
    setTimeout(() => {
      setError(error);
    }, 3000);
  };
  return !loading ? (
    <div className="wrap">
      {error && <MsgError>{error}</MsgError>}
      {message !== null && <MsgSucess>{message}</MsgSucess>}
      <h3>Process view</h3>
      <div
        style={{
          width: "80vw",
          display: "flex",
          padding: "0px 15px",
          justifyContent: "flex-end",
          color: "white"
        }}
      >
        <Link to={`/process-edit/${id}`}>
          <i className="bi bi-pencil-square"> </i>
        </Link>
        &nbsp;&nbsp;
        <Link onClick={DeleteOneProcess}>
          <i className="bi bi-trash3"> </i>
        </Link>
      </div>
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
    </div>
  ) : (
    <div>loading...</div>
  );
};
