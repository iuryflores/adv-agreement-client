import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils.js";
import { MsgError } from "../components/Shared";
import { useNavigate, useParams } from "react-router-dom";

export const AddProcess = ({ setMessage }) => {
  const { id } = useParams();
  const [defendant, setDefendant] = useState("");
  const [dateProcess, setDateProcess] = useState("");
  const [processNumber, setProcessNumber] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [subject, setSubject] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [judgment, setJudgment] = useState("");
  const [error, setError] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.addDefendantProcess(
        {
          dateProcess,
          processNumber,
          complainantName,
          subject,
          jurisdiction,
          judgment
        },
        id
      );
      setMessage("Process created successfuly.");
      navigator(`/defendant/${id}/process`);
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
  useEffect(() => {
    const getDefendant = async () => {
      try {
        const data = await api.getOneDefendant(id);
        setDefendant(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDefendant();
  }, [id]);
  return (
    <div className="wrap">
      <h3>Adding process of {defendant.full_name}</h3>
      {error !== "" && <MsgError>{error}</MsgError>}
      <form onSubmit={handleSubmit}>
        <label>Process date: </label>
        <input
          className="input-login"
          type="date"
          name="dateProcess"
          value={dateProcess}
          onChange={(e) => setDateProcess(e.target.value)}
          autoComplete="off"
        />
        <label>Process number: </label>
        <input
          className="input-login"
          type="text"
          name="processNumber"
          value={processNumber}
          onChange={(e) => {
            setProcessNumber(e.target.value);
          }}
        />
        <label>Complainant name: </label>
        <input
          className="input-login"
          type="text"
          name="complainantName"
          value={complainantName}
          onChange={(e) => {
            setComplainantName(e.target.value);
          }}
        />
        <label>Subject: </label>
        <input
          className="input-login"
          type="text"
          name="subject"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        />
        <label>Jurisdiction: </label>
        <input
          className="input-login"
          type="text"
          name="jurisdiction"
          value={jurisdiction}
          onChange={(e) => {
            setJurisdiction(e.target.value);
          }}
        />
        <label>Judgment: </label>
        <input
          className="input-login"
          type="text"
          name="judgment"
          value={judgment}
          onChange={(e) => {
            setJudgment(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};
