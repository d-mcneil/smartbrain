import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p
          onClick={() => onRouteChange("signed-out")}
          className="f3 link dim black underline pa3 pointer mv0"
        >
          Sign Out
        </p>
      </nav>
    );
  }
};

export default Navigation;
