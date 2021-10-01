import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { Navigation } from "../../components";
import { sessionToken } from "../../utilities/constants";

const Dashboard = ({ history }) => {
  const location = useLocation();
  const queryString = location.hash.substr(1);
  const urlParams = new URLSearchParams(queryString);
  const tokenParam = urlParams.get("access_token") || null; // Token from the URL params

  const currentTime = Math.round(new Date().getTime() / 1000); // Current Time
  const tokenExpiry = sessionStorage.getItem("tokenExpiry") || null; // Token Expiry Time

  useEffect(() => {

    if ( tokenExpiry !== null && (currentTime > tokenExpiry)) {
      sessionStorage.removeItem(sessionToken.name);
      history.push("/");
      return;
    }

    if (tokenParam !== null) {
      sessionStorage.setItem(sessionToken.name, tokenParam);
      sessionStorage.setItem("tokenExpiry", Math.round(new Date().getTime() / 1000) + 3600);
      return;
    }
    
  }, [tokenParam, history, currentTime, tokenExpiry]);

  return (
    <>
      <Navigation />
      <h1>Dashboard</h1>
    </>
  );
};

export default Dashboard;
