import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Login,
  Process,
  Defendant,
  AddDefendant,
  ViewDefendant,
  EditDefendant,
  SignUp,
  DefendantProcess,
  ViewProcess,
  AddProcess,
  AddDeal,
  Deals,
  Parcels,
  EditProcess,
  ViewDeal
} from "./pages";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  const [message, setMessage] = useState(null);
  const [defendant, setDefendant] = useState("");
  const [loading, setLoading] = useState(true);

  let location = useLocation().pathname;

  return (
    <div className="App">
      {location !== "/" && location !== "/user/auth/signup" && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={<Login message={message} setMessage={setMessage} />}
        />
        <Route
          path="/user/auth/signup"
          element={<SignUp setMessage={setMessage} />}
        />
        <Route
          path="/process/:id"
          element={
            <ViewProcess
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/defendant/:id/add-process"
          element={
            <AddProcess
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/defendant"
          element={
            <Defendant
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/add-defendant"
          element={
            <AddDefendant
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/process/:id/add-deal"
          element={
            <AddDeal
              setMessage={setMessage}
              defendant={defendant}
              setDefendant={setDefendant}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />

        <Route
          path="/defendant/:id"
          element={
            <ViewDefendant
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/defendant/:id/process"
          element={
            <DefendantProcess
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/defendant-edit/:id"
          element={
            <EditDefendant
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/process"
          element={
            <Process
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/process-edit/:id"
          element={
            <EditProcess
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/deals"
          element={
            <Deals
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
        <Route
          path="/deal/:id"
          element={
            <ViewDeal
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
       
        <Route
          path="/parcels"
          element={
            <Parcels
              message={message}
              setMessage={setMessage}
              loading={loading}
              setLoading={setLoading}
            />
          }
        />
      </Routes>
      {location !== "/" && location !== "/user/auth/signup" && <Footer />}
    </div>
  );
}

export default App;
