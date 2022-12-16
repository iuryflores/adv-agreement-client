import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, ParceltCard, ButtonView } from "../components/Shared";


export const PaidParcels = ({ message, setMessage, loading, setLoading }) => {
  const [parcels, setParcels] = useState([]);

  useEffect(() => {
    const getParcels = async () => {
      try {
        const data = await api.getPaidParcels();
        setParcels(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    getParcels();
  }, [loading, setLoading]);



  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);
  return !loading ? (
    <div className="wrap">
      {message && <MsgSucess>{message}</MsgSucess>}

      <h3>All paid parcels</h3>
      <ButtonView to={`/parcels`} style={{ width: "fit-content", float: "right" }}>
        See unpaid parcels
      </ButtonView>
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
                      year: "numeric"
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
                    year: "numeric"
                  }
                )}
              </span>
            )}

            <span></span>
            
              <div
                style={{
                  background: "green",
                  color: "white",
                  borderRadius: "5px",
                  padding: "12px 25px"
                }}
              >
                Paid
              </div>
            
            <span></span>
          </ParceltCard>
        );
      })}
    </div>
  ) : (
    <div>loading...</div>
  );
};
