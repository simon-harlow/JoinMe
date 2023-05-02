import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import './Welcome.scss';
import { API_URL } from "../Utils/const";

const Welcome = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/users/4780c8ef-6659-4f56-a6ea-cd0486a39f59`)
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const user = userData;
  console.log(user);

  return (
    <div className="welcome">
      {loading ? (
        <div className="loading">
          Loading...
        </div>
      ) : (
        <h1>Welcome {user.first_name} {user.last_name}</h1>
      )}
    </div>
  );
};

export default Welcome;