import React from "react";
import '../login.css'
import { NavLink, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  function validateEmail(email) {
    var re = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    return re.test(email);
  }

  function tryLogin(method) {
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
    // Will interact with the backend here
    fetch(method == "PUT" ? "/api/login" : "api/register", {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((response) => {
      if (response.status === 401 || response.status === 400) {
        alert("Invalid email or password");
      } else if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("authenticated", true);
        navigate("/setupPage");
      } else {
        alert("An error occurred");
      }
    });
  }

  return (
    <main id="loginPage">
      <div className="shrinker">
        <input id="emailInput" type="email" placeholder=" 📧 Email:" className="loginField" /><br />
        <input id="passwordInput" type="password" placeholder=" 🔒 Password:" className="loginField" /><br />
        <div className="loginButtons">
          <button id="loginButton" onClick={() => tryLogin("PUT")}>Login</button>
          <button id="registerButton" onClick={() => tryLogin("POST")}>Register</button>
        </div>
      </div>
    </main>
  )
}  

export default Login;