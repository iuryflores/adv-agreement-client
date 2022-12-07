import React, { useState, useEffect } from "react";
import api from "../utils/api.utils.js";

export const User = () => {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const data = await api.getUsers();
      setUsers(data);
    } catch (error) {
      console.log(error, `Error to get users`);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <div>
      <h1>All Users</h1>
      {users.map((user) => {
        return user.full_name;
      })}
    </div>
  );
};


