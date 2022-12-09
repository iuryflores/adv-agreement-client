import React from "react";
import { useState } from "react";
import api from "../utils/api.utils.js";
import { MsgError } from "../components/Shared";
import { useNavigate } from "react-router-dom";

export const AddDefendant = () => {
  const [full_name, setFull_name] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [message, setMessage] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addDefendant({ full_name, cnpj });
      navigator("/defendant");
    } catch (error) {
      showMessage(error);
    }
  };
  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(message);
    }, 3000);
  };
  return (
    <div>
      {message !== "" && <MsgError>{message}</MsgError>}
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
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
