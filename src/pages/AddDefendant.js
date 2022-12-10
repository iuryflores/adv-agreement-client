import React from "react";
import { useState } from "react";
import api from "../utils/api.utils.js";
import { MsgError } from "../components/Shared";
import { useNavigate } from "react-router-dom";
import { cnpjMask } from "../components/CnpjMask.js";

export const AddDefendant = ({ setMessage }) => {
  const [full_name, setFull_name] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [error, setError] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addDefendant({ full_name, cnpj });
      setMessage("Defendant created.");
      navigator("/defendant");
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

  return (
    <div className="wrap">
      <h3>Adding defendants</h3>
      {error !== "" && <MsgError>{error}</MsgError>}
      <form onSubmit={handleSubmit}>
        <label>Fullname: </label>
        <input
          className="input-login"
          type="text"
          name="full_name"
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          autoComplete="off"
        />
        <label>CNPJ: </label>
        <input
          className="input-login"
          type="text"
          name="cnpj"
          value={cnpjMask(cnpj)}
          onChange={(e) => {
            setCnpj(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
