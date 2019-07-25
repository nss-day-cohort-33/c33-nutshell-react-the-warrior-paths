import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from './news/News'
// import APIManager from '../modules/APIManager'
import Messages from './message/Messages'
import APIManager from "../modules/APIManager";
export default class ApplicationViews extends Component {
  state = {
    events: [],
    messages: [],
    tasks: [],
    news: [],
    users: []
  }

  componentDidMount() {
    const newState = {};

    fetch("http://localhost:5002/messages")
      .then(r => r.json())
      .then(message => newState.messages = message)
      .then(fetch("http://localhost:5002/users")
      .then(r => r.json()))
      .then(user => newState.users = user)
      .then(() => this.setState(newState))
  }

  addMessage = (data) => {
    APIManager.post("messages", data)
      .then(() => APIManager.getAll("messages", "_expand=user"))
      .then(messages =>
        this.setState({
          messages: messages
        })
      )
  }

  deleteMessage = (id) => {
    return APIManager.delete("messages", id)
      .then(() => APIManager.getAll("messages"))
      .then(message => {
        this.setState({ messages: message });
      });
  };

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  render() {
    return (
      <React.Fragment>

        <Route
          exact path="/" render={props => {
            return <Welcome />
            // Remove null and return the component which will show news articles
          }}
        />

        <Route
          exact path="/news" render={props => {
            if (this.isAuthenticated()) {
              return <News users={this.state.users} />
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          exact path="/register" render={props => {
            return <Register {...props} users={this.state.users} addUser={this.addUser}/>
          }}
        />

        <Route
          path="/friends" render={props => {
            return null
          }}
        />

        <Route
          path="/messages" render={props => {
            if(this.isAuthenticated()) {
            return <Messages messages={this.state.messages} 
            addMessage={this.addMessage} 
            deleteMessage={this.deleteMessage}
            users={this.state.users}/>
            } else {
              return <Redirect to="/login" />
            }
          }}
        />

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/login" component={Login} />

      </React.Fragment>
    );
  }
}
