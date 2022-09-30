import React, { Component } from "react";
import Clarifai from "clarifai";
import ParticlesBg from "particles-bg";
import SignIn from "../components/SignIn/SignIn";
import Register from "../components/Register/Register";
import Navigation from "../components/Navigation/Navigation";
import Logo from "../components/Logo/Logo";
import Rank from "../components/Rank/Rank";
import ImageLinkForm from "../components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition/FaceRecognition";
import apiKey from "../apiKey";

const app = new Clarifai.App({ apiKey });

// https://samples.clarifai.com/face-det.jpg

class App extends Component {
  constructor() {
    super();
    this.state = {
      linkInput: "",
      imageUrl: "",
      faceBox: {},
      route: "signed-out",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        score: 0,
        joined: "",
      },
    };
  }

  calculateFaceBoxLocation = (response) => {
    const clarifaiFace =
      response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  loadUser = (user) => {
    this.setState({ user });
  };

  displayFaceBox = (faceBox) => {
    this.setState({ faceBox });
  };

  onLinkInputChange = (event) => {
    this.setState({ linkInput: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signed-out") {
      this.setState({ isSignedIn: false });
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route });
  };

  onDetect = () => {
    const { linkInput, user } = this.state;
    const { id } = user;
    this.setState({ imageUrl: linkInput });
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, linkInput)
      // '53e1df302c079b3db8a0a36033ed2d15' <- alternative model if face_detect_model happens to be down
      .then((response) => {
        if (response) {
          fetch("http://localhost:3001/image", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          })
            .then((response) => response.json())
            .then((score) => {
              this.setState(Object.assign(this.state.user, { score }));
            });
        }
        return this.calculateFaceBoxLocation(response);
      })
      .then((faceBox) => this.displayFaceBox(faceBox))
      .catch((error) => console.log(error));
  };

  render() {
    const { imageUrl, faceBox, route, isSignedIn, user } = this.state;
    return (
      <>
        <ParticlesBg type="cobweb" color="#eeeeee" num={100} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
        />
        {route === "home" ? (
          <>
            <Logo />
            <Rank userName={user.name} userScore={user.score} />
            <ImageLinkForm
              onDetect={this.onDetect}
              onLinkInputChange={this.onLinkInputChange}
            />
            <FaceRecognition faceBox={faceBox} imageUrl={imageUrl} />
          </>
        ) : route === "signed-out" ? (
          <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        ) : (
          <Register
            onRouteChange={this.onRouteChange}
            loadUser={this.loadUser}
          />
        )}
      </>
    );
  }
}

export default App;
