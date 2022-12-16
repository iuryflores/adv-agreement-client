import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.utils";
import { useEffect, useState } from "react";
import { ButtonView, MsgError } from "../components/Shared";

export const ViewDefendant = ({ loading, setLoading }) => {
  const { id } = useParams();
  const [defendant, setDefendant] = useState("");

  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const getOneDefendant = async () => {
    try {
      const data = await api.getOneDefendant(id);
      setDefendant(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOneDefendant();
  }, [getOneDefendant]);

  const DeleteOneDefendant = async () => {
    try {
      await api.deleteDefendant(id);
      navigate("/defendant");
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
  return !loading ? (
    <div className="wrap">
      <h3>Defendant page</h3>
      {error !== null && <MsgError>{error}</MsgError>}
      <div
        style={{
          width: "90vw",
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
      <ButtonView to={`/defendant/${id}/process`}>PROCESS</ButtonView>
      
    </div>
  ) : (
    <div>Loading...</div>
  );
};
