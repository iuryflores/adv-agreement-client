import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../utils/api.utils";
import { useEffect, useState } from "react";
import { ButtonView, MsgError } from "../components/Shared";

export const EditProcess = ({ loading, setLoading, setMessage }) => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [process, setProcess] = useState("");
  const [error, setError] = useState(null);

  const [dateProcess, setDateProcess] = useState("");
  const [processNumber, setProcessNumber] = useState("");
  const [complainantName, setComplainantName] = useState("");
  const [subject, setSubject] = useState("");
  const [jurisdiction, setJurisdiction] = useState("");
  const [judgment, setJudgment] = useState("");

  useEffect(() => {
    const getOneProcess = async () => {
      try {
        const data = await api.getProcessToEdit(id);
        setProcess(data);
        setDateProcess(data.dateProcess);
        setProcessNumber(data.processNumber);
        setComplainantName(data.complainantName);
        setSubject(data.subject);
        setJurisdiction(data.jurisdiction);
        setJudgment(data.judgment);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    getOneProcess();
  }, [id, setLoading, loading]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.editProcess(
        {
          dateProcess,
          processNumber,
          complainantName,
          subject,
          judgment,
          jurisdiction
        },
        id
      );

      navigate(`/process/${id}`);
      setMessage("Process updated successfuly.");
    } catch (error) {
      showMessage(error);
    }
  };

  let newDate = process?.dateProcess;

  newDate = new Date(newDate).toLocaleDateString("pt-br", {
    day: "numeric",
    month: "numeric",
    year: "numeric"
  });

  const showMessage = (error) => {
    setError(error);
    setTimeout(() => {
      setError(error);
    }, 3000);
  };

  return !loading ? (
    <div>
      <h3>Editing process {}</h3>
      {error && <MsgError>{error}</MsgError>}

      <form onSubmit={handleSubmit} className="form-edit-process">
        <p>
          Process number:
          <input
            className="form-control"
            type="text"
            name="processNumber"
            placeholder={process?.processNumber}
            value={processNumber}
            onChange={(e) => setProcessNumber(e.target.value)}
          />
        </p>
        <p>
          Process date:
          <input
            className="form-control"
            name="dateProcess"
            value={dateProcess}
            type="text"
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            placeholder={newDate}
            onChange={(e) => setDateProcess(e.target.value)}
          />
        </p>
        <p>
          Complainant name:
          <input
            className="form-control"
            type="text"
            name="complainantName"
            placeholder={process?.complainantName}
            value={complainantName}
            onChange={(e) => setComplainantName(e.target.value)}
          />
        </p>
        <p>
          Subject:
          <input
            className="form-control"
            type="text"
            name="subject"
            placeholder={process?.subject}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </p>
        <p>
          Jurisdiction:
          <input
            className="form-control"
            type="text"
            name="jurisdiction"
            placeholder={process?.jurisdiction}
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
          />
        </p>
        <p>
          Judgment:
          <input
            className="form-control"
            type="text"
            name="judgment"
            placeholder={process?.judgment}
            value={judgment}
            onChange={(e) => setJudgment(e.target.value)}
          />
        </p>
        <ButtonView onClick={handleSubmit}>Save</ButtonView>
      </form>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
