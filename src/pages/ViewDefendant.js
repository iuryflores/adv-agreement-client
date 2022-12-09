import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.utils";
import { useEffect, useState } from "react";
import { ButtonView, MsgError } from "../components/Shared";

export const ViewDefendant = () => {
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
  }, []);

  const navigate = useNavigate();

  const DeleteOneDefendant = async () => {
    try {
      await api.deleteDefendant(id);
      navigate("/defendant");
    } catch (error) {
      showMessage(error);
    }
  };
  useEffect(() => {
    getOneDefendant();
  }, []);

  const [message, setMessage] = useState('');
  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage(message);
    }, 3000);
  };
  return (
    <div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-end",
          color: "white"
        }}
      >
        <Link to={`/defendant-edit/${id}`}>
          <i className="bi bi-pencil-square"> </i>
        </Link>
        &nbsp;&nbsp;
        <Link onClick={DeleteOneDefendant}>
          <i className="bi bi-trash3"> </i>
        </Link>
      </div>
      <p>
        Corporate name: <b>{defendant.full_name}</b>{" "}
      </p>
      <p>
        CNPJ: <b>{defendant.cnpj}</b>{" "}
      </p>
      <ButtonView>DEALS</ButtonView>
      <ButtonView>PROCESS</ButtonView>
      {message !== "" && <MsgError>{message}</MsgError>}
    </div>
  );
};
