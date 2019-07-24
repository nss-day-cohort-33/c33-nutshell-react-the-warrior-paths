import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from "./news/News"
import TaskList from "./task/TaskList"
import APIManager from "../modules/APIManager"


export default class ApplicationViews extends Component {




    // fetch("http://localhost:5002/users")
    //   .then(r => r.json())
    //   .then(user => newState.users = user)
      // .then(fetch("http://localhost:3000/news"))
      // .then(r => r.json())
      // .then(news => newState.news = news)


  state = {
    messages: [],
    news: [],
    events: [],
    tasks: [],
    friends: []
}

componentDidMount() {
    const newState = {};

fetch("http://localhost:5002/user")
  .then(r => r.json())
  .then(user => newState.users=user)
}

// isAuthenticated = () => sessionStorage.getItem("credentials") !== null
isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  
  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Welcome />
            // Remove null and return the component which will show news articles
          }}
        />
        {/* <Route
           path="/login" render={props => {
            return <Login/>
            // Remove null and return the component which will show news articles
          }}
        />
        <Route
           path="/register" render={props => {
            return <Register/> */}

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


        <Route exact path="/tasks" render={(props) => {

            return <TaskList getAllUsers={this.getAllUsers} getCurrentUser={this.getCurrentUser} />

        }} />

        <Route path="/login" component={Login} />

      </React.Fragment>
    );
  }
}
