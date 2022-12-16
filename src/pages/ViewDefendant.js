import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.utils";
import { useEffect, useState } from "react";
import { ButtonView, MsgError, ProcessCard } from "../components/Shared";

export const ViewDefendant = ({ loading, setLoading }) => {
  const { id } = useParams();
  const [defendant, setDefendant] = useState("");

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const getOneDefendant = async () => {
      try {
        const data = await api.getOneDefendant(id);
        setDefendant(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    getOneDefendant();
  }, [id, setLoading]);

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
          color: "white",
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
      <ProcessCard style={{marginBottom:'50px', padding:'20px 15px'}}>
        <span>
          Corporate name: <b>{defendant.full_name}</b>
        </span>
        <span>
          CNPJ: <b>{defendant.cnpj}</b>{" "}
        </span>
      </ProcessCard>

      <ButtonView to={`/defendant/${id}/process`}>PROCESS</ButtonView>
      <ButtonView to={`/defendant/${id}/deals`}>DEALS</ButtonView>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
