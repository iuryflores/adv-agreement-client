import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, ParceltCard } from "../components/Shared";
import { Link } from "react-router-dom";
export const Parcels = ({ message, setMessage, loading, setLoading }) => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const getParcels = async () => {
      try {
        const data = await api.getAllParcels();
        setParcels(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, [loading, setLoading]);

  const payParcel = async (parcelId) => {
    try {
      await api.payParcel(parcelId);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);
  return !loading ? (
    <div className="wrap">
      {message && <MsgSucess>{message}</MsgSucess>}

      <h3>All parcels</h3>
      {parcels.length <= 0 && <h3> No deal registred!</h3>}
      {parcels.map((parcel, index) => {
        return (
          <ParceltCard key={index}>
            <i className="bi bi-currency-dollar"></i>
            <p>
              Parcel:
              <b>
                {parcel.quota}/{parcel.totalQuota}
              </b>
            </p>
            <p>
              Price:<b> {parcel.price.toFixed(2).replace(".", ",")}</b>
            </p>

            {!parcel?.payDay ? (
              <p>
                Due date:{" "}
                <b>
                  {new Date(parcel?.dueDate.slice(0, -1)).toLocaleDateString(
                    "pt-br",
                    {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    }
                  )}
                </b>
              </p>
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
  ) : (
    <div>loading...</div>
  );
};
