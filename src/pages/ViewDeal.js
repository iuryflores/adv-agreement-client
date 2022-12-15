import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api.utils.js";
import {
  ButtonView,
  ProcessCard,
  MsgError,
  MsgSucess,
  DefendantCard
} from "../components/Shared.js";

export const ViewDeal = ({ message, setMessage, loading, setLoading }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [deal, setDeal] = useState("");
  const [defendant, setDefendant] = useState("");
  const [process, setProcess] = useState("");

  const [error, setError] = useState(null);

  const getDeal = async () => {
    try {
      const data = await api.getOneDeal(id);
      setDeal(data);
      setDefendant(data.defendantId);
      setProcess(data.processId);
    } catch (error) {}
  };

  const getProcess = async () => {
    try {
      const data = await api.getProcessToDeal(process);
      setProcess(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getDefendant = async () => {
    try {
      const data = await api.getOneDefendant(defendant);
      setDefendant(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDeal();
    getProcess();
    getDefendant();
  }, [id]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);

  /*const DeleteOneProcess = async () => {
    try {
      await api.deleteProcess(id);
      navigate("/process");
    } catch (error) {
      showMessage(error);
    }
  };
*/
  const showMessage = (error) => {
    setError(error);
    setTimeout(() => {
      setError(error);
    }, 3000);
  };
  return !loading ? (
    <div className="wrap">
      {error !== null && <MsgError>{error}</MsgError>}
      {message !== null && <MsgSucess>{message}</MsgSucess>}
      <h3>Deal view</h3>
      <div
        style={{
          display: "flex",
          padding: "0px 15px",
          justifyContent: "flex-end",
          color: "white"
        }}
      >
        <Link to={`/deal-edit/${id}`}>
          <i className="bi bi-pencil-square"> </i>
        </Link>
        &nbsp;&nbsp;
        <Link
          onClick={
            {
              /*DeleteOneDeal*/
            }
          }
        >
          <i className="bi bi-trash3"> </i>
        </Link>
      </div>
      <ProcessCard>
        <span>
          Number of quotas: <b> {deal.quotas}</b>
        </span>
        <span>
          Total price: <b> {deal.price}</b>
        </span>
        <span>
          Process number: <b> {process.processNumber}</b>
        </span>
        <span>
          Defendant: <b> {defendant.full_name}</b>
        </span>
        <span>
          Complainant: <b> {process.complainantName}</b>
        </span>
      </ProcessCard>
    </div>
  ) : (
    <div>loading...</div>
  );
};
