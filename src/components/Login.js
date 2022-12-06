import React, { useState } from "react";
import api from "../utils/api.utils.js";
import { useNavigate } from "react-router-dom";
import './Login.css'

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login({ email, password });
      navigate("/home");
    } catch (error) {
      showMessage(`${error.toUpperCase()}!`);
    }
  };
  const showMessage = (message) => {
    setMessage(message);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };
  return (
    <div className="login">
      <h3><i class="bi bi-folder-check"></i> Adv Manager</h3>
      {" "}
      {message !== "" && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password: </label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
