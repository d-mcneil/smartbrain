import React from "react";
import "./ImageLinkForm.css";

const ImageLinkForm = ({ onLinkInputChange, onDetect }) => {
  return (
    <>
      <div>
        <p className="f3">
          {
            "This Magic Brain will detect faces in your pictures. Give it a try!"
          }
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
              className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple"
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
