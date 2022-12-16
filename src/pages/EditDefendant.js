import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.utils";
import { useEffect, useState } from "react";
import { ButtonView } from "../components/Shared";



export const EditDefendant = () => {
  const { id } = useParams();
  const [defendant, setDefendant] = useState("");

  const getOneDefendant = async () => {
    try {
      const data = await api.getOneDefendant(id);
      setDefendant(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getOneDefendant();
  }, [getOneDefendant]);

  const navigate = useNavigate();

  const [full_name, setFull_name] = useState();
  const [cnpj, setCnpj] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.editDefendant({ full_name, cnpj }, id);
      navigate(`/defendant/${id}`);
    } catch (error) {
      showMessage(error);
    }
  };
  const [message, setMessage] = useState("");
  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(message);
    }, 3000);
  };
  return (
    <div>
      <h3>Editing defendant</h3>
      <form onSubmit={handleSubmit}>
        <p style={{ display: "flex", flexDirection: "column" }}>
          Corporate name:
          <input
            className="form-control"
            type="text"
            name="full_name"
            placeholder={defendant.full_name}
            value={full_name}
            onChange={(e) => setFull_name(e.target.value)}
          />
        </p>
        <p style={{ display: "flex", flexDirection: "column" }}>
          CNPJ:
          <input
            className="form-control"
            type="text"
            name="cnpj"
            placeholder={defendant.cnpj}
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
          />
        </p>
        <ButtonView onClick={handleSubmit}>Save</ButtonView>
      </form>
    </div>
  );
};
