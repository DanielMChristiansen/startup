import React from "react";
import '../login.css'
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate()
  function loginButtonClick() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    tryLogin(email, password);
  }

  function validateEmail(email) {
    var re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

  function tryLogin(email, password) {
    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }
    if (password === "") {
      alert("Password cannot be empty");
      return;
    }
    // Will interact with the backend here
    alert.log(`Email: ${email}, Password: ${password}`);

    localStorage.setItem("email", email);
    localStorage.setItem("authenticated", true);
    navigate("/ataglancePage");
  }

  function registerButtonClick() {
    const email = document.getElementById("emailInput").value;
    const password = document.getElementById("passwordInput").value;
    if (!validateEmail(email)) {
      alert("Invalid email address");
      return;
    }
    if (password === "") {
      alert("Password cannot be empty");
      return;
    }
    localStorage.setItem("email", document.getElementById("emailInput").value);
    localStorage.setItem("authenticated", true);
    navigate("/ataglancePage");
  }
  return (
    <main id="loginPage">
      <div className="shrinker">
        <input id="emailInput" type="email" placeholder=" 📧 Email:" className="loginField" /><br />
        <input id="passwordInput" type="password" placeholder=" 🔒 Password:" className="loginField" /><br />
        <div className="loginButtons">
          <button id="loginButton" onClick={loginButtonClick}>Login</button>
          <button id="registerButton" onClick={registerButtonClick}>Register</button>
        </div>
      </div>
    </main>
  )
}  

export default Login;