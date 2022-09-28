import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, faceBox }) => {
  if (imageUrl) {
    return (
      <div className="justify-content-center ma">
        <div className="absolute mt2">
          <img
            id="input-image"
            src={imageUrl}
            alt="How many faces are in this?"
            width="500px"
            height="auto"
          ></img>
          <div
            className="bounding-box"
            style={{
              left: faceBox.leftCol,
              top: faceBox.topRow,
              right: faceBox.rightCol,
              bottom: faceBox.bottomRow,
            }}
          ></div>
        </div>
      </div>
    );
  }
};

export default FaceRecognition;
