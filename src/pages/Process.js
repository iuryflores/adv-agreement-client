import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils";
import { MsgSucess, DefendantCard, ButtonView } from "../components/Shared";


export const Process = ({ message, setMessage, loading, setLoading }) => {
  const [lawsuit, setLawSuit] = useState([]);

  useEffect(() => {
    const getLawSuit = async () => {
      try {
        const data = await api.getLawSuit();
        setLawSuit(data);
        setLoading(false);
      } catch (error) {
        console.log(error, "Error to get law suit");
      }
    };
    getLawSuit();
  }, [setLoading]);

  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message, setMessage]);
  return !loading ? (
    <div className="wrap">
      {message !== null && <MsgSucess>{message}</MsgSucess>}

      <h3>All Process</h3>
      {lawsuit.length <= 0 && <><h3> No process registred!</h3><h4>To add a process you must add a defendant first.</h4><ButtonView to='/defendant/'>Defendant</ButtonView></>}
      {lawsuit.map((process, index) => (
        <DefendantCard to={`/process/${process._id}`} key={index}>
          <p>
            <i className="bi bi-folder"></i>
          </p>
          <p>
            Date:{" "}
            <b>
              {new Date(process.dateProcess.slice(0, -1)).toLocaleDateString(
                "pt-br",
                {
                  day: "numeric",
                  month: "numeric",
                  year: "numeric",
                }
              )}
            </b>
          </p>
          <p>
            Number: <b>{process.processNumber}</b>
          </p>
          <p className="notShowMobile">
            Defendant: <b>{process.defendantId.full_name}</b>
          </p>
          <p>
            Complainant: <b>{process.complainantName}</b>
          </p>
          <p className="notShowMobile">
            Judgment: <b>{process.judgment}</b>
          </p>
          <i className="bi bi-box-arrow-right"></i>
        </DefendantCard>
      ))}
    </div>
  ) : (
    <div>loading...</div>
  );
};
