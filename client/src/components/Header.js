import React from "react";
const Header = (props) => {
  const logOut = (e) => {
    props.setLoggedIn(false);
    localStorage.removeItem("token");
  };
  return (
    <header>
      <h1>bubbles</h1>
      {props.loggedIn && <button onClick={logOut}>log out</button>}
    </header>
  );
};

export default Header;
