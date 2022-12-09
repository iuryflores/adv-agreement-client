import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Login, User, Home, Defendant, AddDefendant, ViewDefendant, EditDefendant } from "./pages";
import Footer from "./components/Footer";

import { useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";


function App() {
  return (
    <div className="App">
      {useLocation().pathname !== "/" && <Navbar />}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/process" element={<Home />} />
        <Route path="/defendant" element={<Defendant />} />
        <Route path="/add-defendant" element={<AddDefendant />} />
        <Route path="/defendant/:id" element={<ViewDefendant />} />
        <Route path="/defendant-edit/:id" element={<EditDefendant />} />
        <Route path="/users" element={<User />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
