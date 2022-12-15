import React from "react";
import { useState } from "react";
import api from "../utils/api.utils.js";
import { MsgError } from "../components/Shared";
import { useNavigate, Link } from "react-router-dom";

export const SignUp = ({ setMessage }) => {
  const [full_name, setFull_name] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigator = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.signUp({ full_name, email, password });
      setMessage("User created successfuly!");
      navigator("/");
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

  return (
    <div className="login">
      <h4>Sign Up</h4>
      
      {error !== "" && <MsgError>{error}</MsgError>}
      <form onSubmit={handleSubmit}>
        <label>Full name: </label>
        <input
          className="input-login"
          type="text"
          name="full_name"
          value={full_name}
          onChange={(e) => setFull_name(e.target.value)}
          autoComplete="off"
        />
        <label>E-mail: </label>
        <input
          className="input-login"
          type="text"
          name="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <label>Password: </label>
        <input
          className="input-login"
          type="password"
          name="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Sign Up
        </button>
        <p>
         Already have an account? <Link to="/">Log In</Link>
        </p>
      </form>
    </div>
  );
};
