import React from "react";

const ImageLinkForm = ({ onLinkInputChange, onDetect }) => {
  return (
    <>
      <div>
        <p className="f3">
          {"This SmartBrain will detect faces in pictures. Give it a try!"}
        </p>
        <div className="justify-content-center">
          <div className="link-form pa4 br3 shadow-5 justify-content-center">
            <input
              onChange={onLinkInputChange}
              className="f4 pa2 w-70 center"
              type={"search"}
            ></input>
            <button
              onClick={onDetect}
              className="w-30 grow f5 link ph2 pv2 dib white bg-light-purple"
            >
              Detect
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ImageLinkForm;
