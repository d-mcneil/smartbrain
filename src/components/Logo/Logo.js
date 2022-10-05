import React from "react";
import Tilt from "react-parallax-tilt";
import brain from "./brain.png";

const Logo = () => {
  return (
    <div className={"ma3 mb0 justify-content-center"}>
      <Tilt>
        <div
          className="gradient-background br2 shadow-2"
          style={{
            height: "150px",
            width: "150px",
          }}
        >
          <h2 className="pv1 tc mb2 mt0">SmartBrain</h2>
          <div className="tc">
            <img src={brain} alt="Brain Logo"></img>
          </div>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
