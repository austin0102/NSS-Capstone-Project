import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import "./Login.css";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "current_user",
            JSON.stringify({
              id: user.id,
              staff: user.isStaff,
            })
          );

          if (user.isStaff) {
            navigate("/tickets");
          } else {
            navigate("/tickets/add");
          }
        } else {
          window.alert("Invalid login");
        }
      });
  };

  const handleClick = () => {
    navigate("/register");
  };

  return (
    <main className="container--login">
      <section>
        <form className="form--login" onSubmit={handleLogin}>
          <h1>Welcome to Allen's Auto Shop</h1>
          <h2>Please Login</h2>
          <fieldset>
            <label htmlFor="inputEmail"> Email address </label>
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </fieldset>
          <fieldset>
            <button className="sign-in" type="submit">
              Sign in
            </button>
            <button onClick={handleClick}>Register</button>
          </fieldset>
        </form>
      </section>
    </main>
  );
};


