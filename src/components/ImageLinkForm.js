import React from "react";

const ImageLinkForm = ({ onLinkInputChange, onDetect, score }) => {
  const onEnterDetect = (event) => {
    if (event.code === "Enter") {
      onDetect();
    }
  };

  return (
    <>
      <div>
        {score ? (
          <></>
        ) : (
          <p className="f3">
            {
              "This SmartBrain can detect faces; submit an image URL and give it a try!"
            }
          </p>
        )}

        <div className="justify-content-center">
          <div className="link-form pa4 br3 shadow-5 justify-content-center">
            <input
              onChange={onLinkInputChange}
              onKeyDown={onEnterDetect}
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
