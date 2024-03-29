import React, { useState, useEffect } from "react";

import apiUtils from "../utils/api.utils";
import { Button, DefendantCard, MsgSucess } from "../components/Shared";

export const Defendant = ({ message, setMessage, loading, setLoading }) => {
  const [defendants, setDefendants] = useState([]);

  useEffect(() => {
    const getDefendants = async () => {
      try {
        const data = await apiUtils.getDefendants();
        setDefendants(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error to get defendants");
      }
    };
    getDefendants();
  }, [setLoading]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);
  return !loading ? (
    <div className="wrap">
      {message && <MsgSucess>{message}</MsgSucess>}
      <h3>All defendants</h3>
      {defendants.length <= 0 && <h3> No defendant registred!</h3>}
      <Button to="/add-defendant">+</Button>
      {defendants.map((defendant, index) => (
        <DefendantCard to={`/defendant/${defendant._id}`} key={index}>
          <span>
            <i className="bi bi-buildings"></i> <b>{defendant.full_name}</b> -
            (CNPJ: {defendant.cnpj})
          </span>
          <i className="bi bi-box-arrow-in-right"></i>
        </DefendantCard>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};
