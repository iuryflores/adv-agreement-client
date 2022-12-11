import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Login,
  Process,
  Home,
  Defendant,
  AddDefendant,
  ViewDefendant,
  EditDefendant,
  SignUp,
  DefendantProcess,
  ViewProcess,
  AddProcess,
  AddDeal, Deals
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
          element={<ViewProcess message={message} setMessage={setMessage} loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/defendant/:id/add-process"
          element={<AddProcess setMessage={setMessage}  loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/defendant"
          element={<Defendant message={message} setMessage={setMessage}  loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/add-defendant"
          element={<AddDefendant setMessage={setMessage}  loading={loading} setLoading={setLoading} />}
        />
        <Route
          path="/process/:id/add-deal"
          element={
            <AddDeal
              setMessage={setMessage}
              defendant={defendant}
              setDefendant={setDefendant}
              loading={loading} setLoading={setLoading} 
            />
          }
        />

        <Route path="/defendant/:id" element={<ViewDefendant  loading={loading} setLoading={setLoading} />} />
        <Route
          path="/defendant/:id/process"
          element={
            <DefendantProcess message={message} setMessage={setMessage} loading={loading} setLoading={setLoading}  />
          }
        />
        <Route path="/defendant-edit/:id" element={<EditDefendant  loading={loading} setLoading={setLoading} />} />
        <Route path="/process" element={<Process message={message} setMessage={setMessage} loading={loading} setLoading={setLoading}/>} />
        <Route path="/deals" element={<Deals message={message} setMessage={setMessage} loading={loading} setLoading={setLoading}/>} />
      </Routes>
      {location !== "/" && location !== "/user/auth/signup" && <Footer />}
    </div>
  );
}

export default App;
