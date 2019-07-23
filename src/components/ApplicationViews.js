import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
export default class ApplicationViews extends Component {

  state = {
    messages: [],
    news: [],
    events: [],
    tasks: [],
    friends: []
}

componentDidMount() {
    const newState = {};

fetch("http://localhost:5002/users")
  .then(r => r.json())
  .then(user => newState.users=user)
}

isAuthenticated = () => sessionStorage.getItem("credentials") !== null



  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Welcome/>
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
           path="/login" render={props => {
            return <Login/>
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
           path="/register" render={props => {
            return <Register/>
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
            // Remove null and return the component which will show list of friends
          }}
        />

        <Route
          path="/messages" render={props => {
            return null
            // Remove null and return the component which will show the messages
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

      </React.Fragment>
    );
  }
}
