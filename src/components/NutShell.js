import React, { Component } from "react";
import NavBar from "./nav/NavBar";
import ApplicationViews from "./ApplicationViews";
import DataManager from "../modules/DataManager";


export default class Nutshell extends Component {
  constructor(props) {
    super(props);
    this.populateAppState = this.populateAppState.bind(this);
  }

  populateAppState() {
    DataManager.getAll("users").then((users) => {
      this.setState({ users: users });
    });
  }
  componentDidMount() {
    this.populateAppState();
  }
  registerIt = (username, password) => {
    return DataManager.registerIt(username, password);
  };

  getAllUsers = () => {
    return DataManager.getAll("users", "");
  };

  addUser = (user) =>
    DataManager.post("users", user)
      .then(() => this.populateAppState())
      .then(() => this.registerIt(user.username, user.password));

  //This is in progress, may not function now
  isAuthenticated = () => sessionStorage.getItem("User") !== null;

  //Function to hide the navbar and show it after login
  showNav = () => {
    if (this.isAuthenticated()) {
      return (
        <NavBar
        />
      );
    }
  };

  render() {
    return (
      <React.Fragment>
        {this.showNav()}
        <ApplicationViews
          
          populateAppState={this.populateAppState}
          registerIt={this.registerIt}
          getAllUsers={this.getAllUsers}
          addUser={this.addUser}
        />
      </React.Fragment>
    );
  }
}
