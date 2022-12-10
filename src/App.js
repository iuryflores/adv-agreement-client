import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { useState } from "react";
import {
  Login,
  User,
  Home,
  Defendant,
  AddDefendant,
  ViewDefendant,
  EditDefendant
} from "./pages";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const [message, setMessage] = useState(null);

  return (
    <div className="App">
      {useLocation().pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/process" element={<Home />} />
        <Route
          path="/defendant"
          element={<Defendant message={message} setMessage={setMessage} />}
        />
        <Route
          path="/add-defendant"
          element={<AddDefendant setMessage={setMessage} />}
        />
        <Route path="/defendant/:id" element={<ViewDefendant />} />
        <Route path="/defendant-edit/:id" element={<EditDefendant />} />
        <Route path="/users" element={<User />} />
      </Routes>
      {useLocation().pathname !== "/" && <Footer />}
    </div>
  );
}

export default App;
