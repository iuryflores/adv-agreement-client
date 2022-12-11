import React from "react";
import { useState, useEffect } from "react";
import api from "../utils/api.utils.js";
import { MsgError } from "../components/Shared";
import { useNavigate, useParams } from "react-router-dom";

export const AddDeal = ({  setMessage }) => {
  const { id } = useParams();

  const [process, setProcess] = useState("");
  const [quotas, setQuotas] = useState("");

  const [price, setPrice] = useState("");
  const [dueDate, setDueDate] = useState("");

  const [error, setError] = useState(null);

  const navigator = useNavigate();

  const getProcess = async () => {
    try {
      const data = await api.getProcessToAddDeal(id);

      setProcess(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.addDealToProcess(
        {
          quotas,
          processId: id,
          price,
          dueDate,
          defendantId: process.defendantId._id
        },
        id
      );
      setMessage("Deal created successfuly.");
      navigator(`/process/${id}`);
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
    getProcess();
  }, []);

  return (
    <div className="wrap">
      <h3>
        Adding deal to process n.{" "}
        {/*process.processNumber} of {process.defendantId.full_name} against {process.complainantName*/}
      </h3>
      {error !== null && <MsgError>{error}</MsgError>}
      <form onSubmit={handleSubmit}>
        <label>How many quotas: </label>
        <input
          className="input-login"
          type="number"
          name="quotas"
          value={quotas}
          onChange={(e) => setQuotas(e.target.value)}
          autoComplete="off"
        />
        <label>Price of deal: </label>
        <input
          className="input-login"
          type="number"
          name="price"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <label>Due date of first parcel: </label>
        <input
          className="input-login"
          type="date"
          name="dueDate"
          value={dueDate}
          onChange={(e) => {
            setDueDate(e.target.value);
          }}
        />

        <button className="button" type="submit">
          Add Deal
        </button>
      </form>
    </div>
  );
};
