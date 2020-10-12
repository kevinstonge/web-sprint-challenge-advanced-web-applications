import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../api/axiosWithAuth";

const Login = ({ setLoggedIn }) => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const { push } = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token !== null) {
      setLoggedIn(true);
      push("/bubbles");
    }
  }, [setLoggedIn, push]);
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const handleChange = (e) => {
    e.persist();
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("...attempting to log in");
    axiosWithAuth()
      .post("/login", credentials)
      .then((r) => {
        if (r.status === 200 && r.data.payload) {
          localStorage.setItem("token", r.data.payload);
          setLoggedIn(true);
          push("/bubbles");
        }
      })
      .catch((e) => setErrorMessage("something went wrong"));
  };
  return (
    <div className="login">
      <h1>Log in!</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">
          username:{" "}
          <input
            type="text"
            id="username"
            name="username"
            value={credentials.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          password:{" "}
          <input
            type="password"
            id="password"
            name="password"
            value={credentials.password}
            onChange={handleChange}
          />
        </label>
        <p>{errorMessage}</p>
        <button type="submit">log in</button>
      </form>
    </div>
  );
};

export default Login;
