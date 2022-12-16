import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import api from "../utils/api.utils.js";
import {
  ProcessCard,
  MsgError,
  MsgSucess,
  ParceltCard,
} from "../components/Shared.js";

export const ViewDeal = ({ message, setMessage, loading, setLoading }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [parcels, setParcels] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    const getParcels = async () => {
      try {
        const data = await api.getParcels(id);
        setParcels(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, [id, loading, setLoading]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);

  const DeleteOneDeal = async () => {
    try {
      await api.deleteDeal(id);
      navigate("/process");
    } catch (error) {
      showMessage(error);
    }
  };
  const payParcel = async (parcelId) => {
    try {
      await api.payParcel(parcelId);
      setLoading(true)
    } catch (error) {
      console.log(error);
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
      {error !== null && <MsgError>{error}</MsgError>}
      {message !== null && <MsgSucess>{message}</MsgSucess>}
      <h3>Deal view</h3>
      <div
        style={{
          display: "flex",
          padding: "0px 15px",
          justifyContent: "flex-end",
          color: "white",
        }}
      >
        <Link onClick={DeleteOneDeal}>
          <i className="bi bi-trash3"> </i>
        </Link>
      </div>
      <ProcessCard>
        <span>
          Number of quotas: <b> {parcels[0]?.dealId?.quotas}</b>
        </span>
        <span>
          Total price:{" "}
          <b>R$ {parcels[0]?.dealId?.price.toFixed(2).replace(".", ",")}</b>
        </span>
        <span>
          Process number: <b> {parcels[0]?.dealId?.processId?.processNumber}</b>
        </span>
        <span>
          Defendant: <b> {parcels[0]?.dealId?.defendantId?.full_name}</b>
        </span>
        <span>
          Complainant: <b> {parcels[0]?.dealId?.processId?.complainantName}</b>
        </span>
        <span>Valor pendente: R$ {parcels.reduce((acc,parcel) =>{return parcel.payDay ? acc : acc + parcel.price},0).toFixed(2).replace(".", ",")} </span>
        <span>Valor pago: R$ {parcels.reduce((acc,parcel) =>{return !parcel.payDay ? acc : acc + parcel.price},0).toFixed(2).replace(".", ",")} </span>
      </ProcessCard>
      <div>
        <h3>Parcels</h3>
        {parcels.map((parcel, index) => {
          return (
            <ParceltCard key={index}>
              <i className="bi bi-currency-dollar"></i>
              <span>
                Parcel: {parcel.quota}/{parcel.totalQuota}
              </span>
              <span>Price: {parcel.price.toFixed(2).replace(".", ",")}</span>

        
              {!parcel?.payDay ? (
                <span>
                  Due date:{" "}
                  {new Date(parcel?.dueDate.slice(0, -1)).toLocaleDateString(
                    "pt-br",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              ) : (
                <span>
                  Paid on:{" "}
                  {new Date(parcel?.payDay.slice(0, -1)).toLocaleDateString(
                    "pt-br",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  )}
                </span>
              )}

              <span></span>
              {parcel?.payDay ? (
                <Link
                  style={{
                    background: "green",
                    color: "white",
                    borderRadius: "5px",
                    padding: "2px 15px",
                  }}
                >
                  Paid
                </Link>
              ) : (
                <Link
                  onClick={() => {
                    payParcel(parcel._id);
                  }}
                  style={{
                    background: "red",
                    color: "white",
                    borderRadius: "5px",
                    padding: "2px 15px",
                  }}
                >
                  Pay
                </Link>
              )}
              <span></span>
            </ParceltCard>
          );
        })}
      </div>
    </div>
  ) : (
    <div>loading...</div>
  );
};
