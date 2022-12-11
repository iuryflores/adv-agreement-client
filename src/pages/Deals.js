import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, Button, DefendantCard } from "../components/Shared";

export const Deals = ({ message, setMessage, loading, setLoading }) => {
  const [deals, setDeals] = useState([]);

  const getDeals = async () => {
    try {
      const data = await api.getDeals();
      setDeals(data);
      setLoading(false);
    } catch (error) {
      console.log(error, "Error to get law suit");
    }
  };

  useEffect(() => {
    getDeals();
  }, []);
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
        <DefendantCard to={`/process/${process._id}`} key={index}>
          <p>
            <i className="bi bi-folder"></i> Date: <b>{deal.dueDate}</b>
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
