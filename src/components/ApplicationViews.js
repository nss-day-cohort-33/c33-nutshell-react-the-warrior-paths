import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
export default class ApplicationViews extends Component {
  state = {
    // users: [],
    events: [],
    messages: [],
    tasks: [],
    news: [],
  }

  componentDidMount() {
    const newState = {}

    fetch("http://localhost:5002/users")
      .then(r => r.json())
      .then(user => newState.users = user)
      // .then(fetch("http://localhost:3000/news"))
      // .then(r => r.json())
      // .then(news => newState.news = news)
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  state = {
    users: [],
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
<<<<<<< HEAD
            return <Welcome />
=======
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
>>>>>>> master
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
          exact path="/news" render={props => {
            if (this.isAuthenticated()) {
              return <News users={this.state.news} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />
        <Route
          exact path="/register" render={props => {
            return <Register />
            // Remove null and return the component which will show news articles
          }}
        />
        {/* <Route
          exact path="/news" render={props => {
            return <News />
            // Remove null and return the component which will show news articles
          }}
        /> */}

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

<<<<<<< HEAD
        <Route path="/login" component={Login} />

=======
>>>>>>> master
      </React.Fragment>
    );
  }
}
