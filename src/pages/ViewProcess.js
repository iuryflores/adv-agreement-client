import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api.utils.js";
import { ProcessCard } from "../components/Shared.js";

export const ViewProcess = () => {
  const { id } = useParams();

  const [process, setProcess] = useState("");

  const getProcess = async () => {
    try {
      const data = await api.getProcess(id);
      setProcess(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProcess();
  });
  return (
    <>
      <h3>Process view</h3>

      <ProcessCard>
        <span>
          Process date:{" "}
          <b>
            {
              (process.dateProcess = new Date(
                process.dateProcess
              ).toLocaleDateString())
            }
          </b>
        </span>
        <span>
          Process number: <b> {process.processNumber}</b>
        </span>
        <span>
          Defendant: <b> {process.defendantId.full_name}</b>
        </span>
        <span>
          Defendant CNPJ: <b> {process.defendantId.cnpj}</b>
        </span>
        <span>
          Complainant: <b> {process.complainantName}</b>
        </span>
        <span>
          Subject: <b> {process.subject}</b>
        </span>
        <span>
          Jurisdiction: <b> {process.jurisdiction}</b>
        </span>
        <span>
          Judgment: <b> {process.judgment}</b>
        </span>
      </ProcessCard>
    </>
  );
};
