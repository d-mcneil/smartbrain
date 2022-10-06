import React from "react";
import Logo from "./Logo/Logo";

const Navigation = ({ onRouteChange, isSignedIn, route }) => {
  return (
    <nav style={{ display: "flex" }}>
      <Logo />
      {isSignedIn ? (
        <p
          onClick={() => onRouteChange("signed-out")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Sign Out
        </p>
      ) : route === "register" ? (
        <p
          onClick={() => onRouteChange("signed-out")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Sign In
        </p>
      ) : (
        <p
          onClick={() => onRouteChange("register")}
          className="f3 link dim black underline pa3 pointer mv0 push"
        >
          Register
        </p>
      )}
    </nav>
  );
};

export default Navigation;
