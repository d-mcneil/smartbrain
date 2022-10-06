import React from "react";

const FaceRecognition = ({ imageUrl, faceBoxes }) => {
  if (imageUrl) {
    return (
      <div className="justify-content-center ma">
        <div className="absolute mt2">
          <img
            id="input-image"
            src={imageUrl}
            alt="How many faces are in this?"
            width="320px"
            style={{ maxWidth: "320px" }}
            height="auto"
          ></img>
          {faceBoxes.map((faceBox) => {
            return (
              <div
                className="bounding-box"
                style={{
                  left: faceBox.leftCol,
                  top: faceBox.topRow,
                  right: faceBox.rightCol,
                  bottom: faceBox.bottomRow,
                }}
                key={`left:${faceBox.leftCol}_top:${faceBox.topRow}_right:${faceBox.rightCol}_bottom:${faceBox.bottomRow}`}
              ></div>
            );
          })}
        </div>
      </div>
    );
  }
};

export default FaceRecognition;
