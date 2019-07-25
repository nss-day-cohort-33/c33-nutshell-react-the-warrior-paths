import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from './news/News'
import NewsForm from "./news/NewsForm";
import NewsEditForm from "./news/NewsEditForm";
import Messages from './message/Messages'
import APIManager from '../modules/APIManager'

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
      .then(fetch("http://localhost:5002/news"))
      .then(news => (newState.news = news))
      .then(() => this.setState(newState));
  }

  isAuthenticated = () => sessionStorage.getItem("current_user") !== null

// NEWS FUNCTIONS BEGIN
  deleteArticle = id => {
    return APIManager.delete("news", id)
      .then(() => APIManager.getAll("news"))
      .then(news => {
        this.setState({
          news: news
        });
      });
  };

  addArticle = article => {
    return APIManager.post("news", article)
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };

  updateArticle = (editedArticle,id) => {
    return APIManager.put("news",editedArticle,id )
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };
// NEWS FUNCTIONS END

  render() {
    return (
      <React.Fragment>
        <Route
          exact path="/" render={props => {
            return <Welcome />
          }}
        />
        {/* NEWS ROUTES BEGIN */}
         <Route exact path="/news" render={props => {
            if (this.isAuthenticated()) {
              return (
                <News {...props} deleteArticle={this.deleteArticle} news={this.state.news}
                />
              );
            } else {
              return <Redirect to="/" />;
            }
          }}
        />
        <Route exact path="/news/new" render={props => {
            return <NewsForm {...props} addArticle={this.addArticle} />;
          }}
        />
        <Route exact path="/news/:newsId(\d+)/edit" render={props => {
            return <NewsEditForm {...props} updateArticle={this.updateArticle} />
            ;
          }}
        />
        {/* NEWS ROUTES END */}
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
          }}
        />

        <Route path="/login" component={Login} />

      </React.Fragment>
    );
  }
}
