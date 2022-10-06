import React, { Component } from "react";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      name: "",
      error: "",
    };
  }

  onEnterSubmit = (event) => {
    if (event.code === "Enter") {
      this.onSubmit();
    }
  };

  onEmailChange = (event) => {
    this.setState({ email: event.target.value });
  };

  onPasswordChange = (event) => {
    this.setState({ password: event.target.value });
  };

  onNameChange = (event) => {
    this.setState({ name: event.target.value });
  };

  onSubmit = () => {
    const { onRouteChange, loadUser } = this.props;
    const { password, email, name } = this.state;
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password, email, name }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.id) {
          loadUser(data);
          onRouteChange("home");
        } else {
          this.setState({ error: data });
        }
      })
      .catch((err) =>
        this.setState({ error: "Unable to register new user: 0" })
      );
  };

  render() {
    const { error } = this.state;
    return (
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure center">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                  onKeyDown={this.onEnterSubmit}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.onEmailChange}
                  onKeyDown={this.onEnterSubmit}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  onKeyDown={this.onEnterSubmit}
                />
              </div>
            </fieldset>
            <div className="mt3">
              <input
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
                onClick={this.onSubmit}
                onKeyDown={this.onEnterSubmit}
              />
            </div>
            {error ? (
              <div className="lh-copy mt3">
                <p className="b mb0 f6 pt2 link dim black db pointer">
                  {error}
                </p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
