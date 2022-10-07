import React, { Component } from "react";
import ParticlesBg from "particles-bg";
import SignIn from "../components/SignIn";
import Register from "../components/Register";
import Navigation from "../components/Navigation";
import Rank from "../components/Rank";
import ImageLinkForm from "../components/ImageLinkForm";
import FaceRecognition from "../components/FaceRecognition";
import Profile from "../components/Profile";
import mainUrl from "../mainUrl";

const initialState = {
  linkInput: "",
  imageUrl: "",
  faceBoxes: [],
  route: "signed-out",
  isSignedIn: false,
  deleteUserError: "",
  user: {
    id: "",
    name: "",
    email: "",
    score: 0,
    rank: 0,
    joined: "",
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      linkInput: "",
      imageUrl: "",
      faceBoxes: [],
      route: "signed-out",
      isSignedIn: false,
      deleteUserError: "",
      user: {
        id: "",
        name: "",
        email: "",
        score: 0,
        rank: 0,
        joined: "",
      },
    };
  }

  onDeleteUser = (email) => {
    fetch(`${mainUrl}/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === "user deleted") {
          this.setState(initialState);
        } else {
          this.setState({ deleteUserError: data });
        }
      })
      .catch((err) =>
        this.setState({ deleteUserError: "Error deleting user: 1" })
      );
  };

  calculateFaceBoxLocations = (response) => {
    const regions = response.outputs[0].data.regions;
    if (!regions) {
      return [];
    }
    const image = document.getElementById("input-image");
    const width = Number(image.width);
    const height = Number(image.height);
    const faceBoxes = regions.map((region) => {
      const clarifaiFace = region.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    });
    return faceBoxes;
  };

  loadUser = (user) => {
    this.setState({ user });
  };

  displayFaceBoxes = (faceBoxes) => {
    this.setState({ faceBoxes });
  };

  onLinkInputChange = (event) => {
    this.setState({ linkInput: event.target.value });
  };

  onRouteChange = (route) => {
    if (route === "signed-out") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true, deleteUserError: "" });
    }
    this.setState({ route });
  };

  onDetect = () => {
    const { linkInput, user } = this.state;
    const { id } = user;
    this.setState({ imageUrl: linkInput, faceBoxes: [] });
    fetch(`${mainUrl}/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ linkInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          if (data.outputs[0].data.regions) {
            fetch(`${mainUrl}/score`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: id,
                score: data.outputs[0].data.regions.length,
              }),
            })
              .then((response) => response.json())
              .then((obj) => {
                this.setState(
                  Object.assign(this.state.user, { score: obj.score })
                );
                this.setState(
                  Object.assign(this.state.user, { rank: obj.rank })
                );
              });
          }
        }
        return this.calculateFaceBoxLocations(data);
      })
      .then((faceBoxes) => this.displayFaceBoxes(faceBoxes))
      .catch((err) => console.log("error fetching image or score data"));
  };

  render() {
    const { imageUrl, faceBoxes, route, isSignedIn, user, deleteUserError } =
      this.state;
    return (
      <>
        <ParticlesBg type="cobweb" color="#eeeeee" num={100} />
        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn}
          route={route}
        />
        {route === "home" ? (
          <>
            <Rank
              userName={user.name}
              userScore={user.score}
              userRank={user.rank}
            />
            <ImageLinkForm
              onDetect={this.onDetect}
              onLinkInputChange={this.onLinkInputChange}
              score={user.score}
            />
            <FaceRecognition faceBoxes={faceBoxes} imageUrl={imageUrl} />
          </>
        ) : route === "profile" ? (
          <Profile
            user={user}
            onDeleteUser={this.onDeleteUser}
            error={deleteUserError}
          />
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
