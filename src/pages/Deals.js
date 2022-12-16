import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, DefendantCard } from "../components/Shared";

export const Deals = ({ message, setMessage, loading, setLoading }) => {
  const [deals, setDeals] = useState([]);
  const [process, setProcess] = useState("");

  useEffect(() => {
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
    getDeals();
  }, [setLoading, setProcess]);
  console.log(process)
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);


  return !loading ? (
    <div className="wrap">
      {message !== null && <MsgSucess>{message}</MsgSucess>}

      <h3>All Deals</h3>
      {deals.length <= 0 && <h3> No deal registred!</h3>}
      {deals.map((deal, index) => (
        <DefendantCard to={`/deal/${deal._id}`} key={index}>
          <p>
            <i className="bi bi-arrow-left-right"></i>
          </p>
          <p>
            Process nº: <b>{deal?.processId?.processNumber}</b>
          </p>
          <p className="notShowMobile">
            Defendant: <b>{deal.defendantId.full_name}</b>
          </p>
          <p className="notShowMobile">
            Complainant: <b>{deal.processId.complainantName}</b>
          </p>
          <p>
            Total of quotas: <b>{deal.quotas}</b>
          </p>
          <p>
            Price total: <b>R$ {deal.price.toFixed(2).replace(".", ",")}</b>
          </p>

          <i className="bi bi-box-arrow-right"></i>
        </DefendantCard>
      ))}
    </div>
  ) : (
    <div>Loading...</div>
  );
};
