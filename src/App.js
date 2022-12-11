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
  EditDefendant,
  SignUp, DefendantProcess, ViewProcess, AddProcess
} from "./pages";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  const [message, setMessage] = useState(null);

  let location = useLocation().pathname;

  return (
    <div className="App">
      {location !== "/" && location !== "/user/auth/signup" && <Navbar />}

      <Routes>
        <Route path="/" element={<Login message={message} setMessage={setMessage} />} />
        <Route path="/user/auth/signup" element={<SignUp setMessage={setMessage} />}  />
        <Route path="/process/:id" element={<ViewProcess />} />
        <Route path="/defendant/:id/add-process" element={<AddProcess setMessage={setMessage} />} />
        <Route path="/defendant" element={<Defendant message={message} setMessage={setMessage} />} />
        <Route path="/add-defendant" element={<AddDefendant setMessage={setMessage} />} />
        
        <Route path="/defendant/:id" element={<ViewDefendant />} />
        <Route path="/defendant/:id/process" element={<DefendantProcess message={message} setMessage={setMessage}  />} />
        <Route path="/defendant-edit/:id" element={<EditDefendant />} />
        <Route path="/users" element={<User />} />
      </Routes>
      {location !== "/" && location !== "/user/auth/signup" && <Footer />}
    </div>
  );
}

export default App;
