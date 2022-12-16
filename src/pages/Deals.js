import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, DefendantCard } from "../components/Shared";

export const Deals = ({ message, setMessage, loading, setLoading }) => {
  const [deals, setDeals] = useState([]);
  const [ setProcess] = useState("");

  const getDeals = async () => {
    try {
      const data = await api.getDeals();
      setDeals(data);
      setProcess(data.processId);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error to get law suit");
    }
  };

  useEffect(() => {
    getDeals();
  }, [getDeals]);
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);
  return !loading ? (
    <div className="wrap">
      {message && <MsgSucess>{message}</MsgSucess>}

      <h3>All Deals</h3>
      {deals.length <= 0 && <h3> No deal registred!</h3>}
      {deals.map((deal, index) => (
        <DefendantCard to={`/deal/${deal._id}`} key={index}>
          <p>
            <i className="bi bi-folder"></i>
          </p>
          <p>
            Defendant: <b>{deal.defendantId.full_name}</b>
          </p>
          <p>
            Complainant: <b>{deal.processId.complainantName}</b>
          </p>
          <p>
            Total de quotas: <b>{deal.quotas}</b>
          </p>
          <p>
            Price total: <b>{deal.price}</b>
          </p>
          <p>
            Status: <b>{deal.status === true ? "Active" : ""}</b>
          </p>
          <i className="bi bi-box-arrow-right"></i>
        </DefendantCard>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};
