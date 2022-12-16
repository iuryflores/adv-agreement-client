import React from "react";
import api from "../utils/api.utils";
import { useState, useEffect } from "react";
import { DefendantCard, MsgError } from "../components/Shared";
import { useParams } from "react-router-dom";

export const DefendantDeals = ({ loading, setLoading }) => {
  const { id } = useParams();

  const [deals, setDeals] = useState([]);
  const [defendant, setDefendant] = useState("");

  useEffect(() => {
    const getDefendant = async () => {
      try {
        const data = await api.getOneDefendantDeals(id);
        setDefendant(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getDefendant();
  }, [id, setLoading]);
  useEffect(() => {
    const getAllDealsDefendant = async () => {
      try {
        const data = await api.getDefendantDeals(id);
        setDeals(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error to getting deals");
      }
    };
    getAllDealsDefendant();
  }, [id, setLoading]);
  return !loading ? (
    <div>
      <h3 style={{ display: "flex", flexDirection: "column" }}>
        <span>All deals from</span>
        <span>{defendant.full_name}</span>
        <span>({defendant.cnpj})</span>
      </h3>
      {deals.length === 0 && (
        <MsgError>None deals for this defendant was created!</MsgError>
      )}
      {deals.map((deal, index) => {
        return (
          <DefendantCard key={index} to={`/deal/${deal._id}`}>
            <i className="bi bi-arrow-left-right"></i>
            <p>
              Process number: <b> {deal?.processId?.processNumber}</b>
            </p>
            <p>
              Defendant: <b> {deal?.defendantId?.full_name}</b>
            </p>
            <p>
              Complainant: <b> {deal?.processId?.complainantName}</b>
            </p>
            <p>
              Total of quotas: <b>{deal?.quotas}</b>
            </p>
            <p>
              Price total: <b>{deal?.price.toFixed(2).replace(".", ",")}</b>
            </p>
            <i className="bi bi-box-arrow-in-right"></i>
          </DefendantCard>
        );
      })}
    </div>
  ) : (
    <div>loading...</div>
  );
};
