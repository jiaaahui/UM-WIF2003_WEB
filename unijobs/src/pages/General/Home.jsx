import React from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import "../../pages-css/General/General.css";
import logo from "./../../assets/images/General/logo.png";

function Home() {
  return (
    <div className="background1">
      <div className="hi">
        <p className="welcome-text">Welcome to</p>
        <p className="logo-text">UniJobs</p>
        <p className="welcome-text">Best Platform for University Freelancers</p>
        <div className="login-options">
          <div className="button-container3">
            <input
              onClick={() => (window.location.href = "/Login")}
              type="submit"
              value="Login"
            />
          </div>
          <div className="button-container3">
            <input
              onClick={() => (window.location.href = "/Register")}
              type="submit"
              value="Register"
            />
          </div>
        </div>
      </div>
      <img className="logo-home-box" src={logo} alt="Logo" />
    </div>
  );
}

export default Home;
