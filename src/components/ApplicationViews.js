import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from './news/News'
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import Messages from './message/Messages'

export default class ApplicationViews extends Component {
  state = {
    events: [],
    messages: [],
    tasks: [],
    news: [],
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
      .then(fetch("http://localhost:5002/news"))
      .then(news => (newState.news = news))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("current_user") !== null

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
          exact
          path="/news"
          render={props => {
            if (this.isAuthenticated()) {
              return (
                <News
                  {...props}
                  deleteArticle={this.deleteArticle}
                  news={this.state.news}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route
          exact
          path="/news/news"
          render={props => {
            return <NewsForm {...props} addArticle={this.addArticle} />;
          }}
        />
        <Route
          exact
          path="/news/:newsId(\d+)/edit"
          render={props => {
            return (
              <NewsEditForm {...props} updateArticle={this.updateArticle} />
            );
          }}
        />
        {/* End news routes */}

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
            return <Messages messages={this.state.messages}
                  users={this.state.users}/>
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
