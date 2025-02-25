import React from "react";
import '../login.css'
import { NavLink } from "react-router-dom";

function Login() {
    return (
      <main id="loginPage">
        <div className="shrinker">
          <input id="emailInput" type="email" placeholder=" 📧 Email:" className="loginField" /><br />
          <input id="passwordInput" type="password" placeholder=" 🔒 Password:" className="loginField" /><br />
          <div className="loginButtons">
            <NavLink to="/ataglancePage">
              <button id="loginButton">Login</button>
            </NavLink>
            <button id="registerButton">Register</button>
          </div>
        </div>
      </main>
    )
}  

export default Login;