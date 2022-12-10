import React, { useState, useEffect } from "react";
import api from "../utils/api.utils.js";
import { Link, useNavigate } from "react-router-dom";

import { MsgError, MsgSucess } from "../components/Shared.js"

export const Login = ({ message, setMessage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.login({ email, password });
      navigate("/home");
    } catch (error) {
      showMessage(error);
    }
  };
  const showMessage = (error) => {
    setError(error);
    setTimeout(() => {
      setError(null);
    }, 5000);
  };
  useEffect(() => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  }, [message]);
  return (
    <div className="login">
      <h2>Welcome</h2>
      <h3 className="h3">
        <i className="bi bi-folder-check"></i> Adv Manager
      </h3>
      {message !== null && <MsgSucess>{message}</MsgSucess>}
      {error !== null && <MsgError>{error}</MsgError>}
      <form onSubmit={handleSubmit}>
        <label>Email: </label>
        <input
          className="input-login"
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label>Password: </label>
        <input
          className="input-login"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span>Forgot password?</span>
        <button className="button" type="submit">
          Login
        </button>
        <p style={{ marginTop: "80px" }}>
          Don't have an account? <Link to="/user/auth/signup">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};
