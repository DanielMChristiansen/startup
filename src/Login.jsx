import React from "react";
import '../login.css'
import { useNavigate } from "react-router-dom";
import { AuthState } from "./authState";

function Login({currentAuthState, setCurrentAuthState}) {
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
      } else if (response.status === 409) {
        alert("User already exists");
      } else if (response.status === 200) {
        localStorage.setItem("email", email);
        localStorage.setItem("authenticated", true);
        setCurrentAuthState(AuthState.Authenticated);
        fetch("/api/calendars").then((response) => response.json()).then((data) => {
          if (data.calendars.length === 0) {
            navigate("/setupPage");
          } else {
            navigate("/quickviewPage");
          }
        });
      } else {
        alert("An error occurred");
      }
    }).catch((error) => {
      alert("Failed to reach server!");
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
      <br />
      <br />
    </main>
  )
}  

export default Login;