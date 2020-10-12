import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles/App.scss";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return (
    <Router>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Route
        exact
        path="/"
        render={() => <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />}
      />
      {/* 
          Build a PrivateRoute component that will 
          display BubblePage when you're authenticated 
        */}
      <PrivateRoute loggedIn={loggedIn} component={BubblePage} />
    </Router>
  );
}

export default App;
