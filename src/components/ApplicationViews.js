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
import EventsForm from "./event/eventsForm"
import Events from "./event/Events"
import EditForm from "./event/editForm";

export default class ApplicationViews extends Component {

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
    APIManager.getAll("events")
    .then(events => (newState.events = events))
    fetch("http://localhost:5002/messages")
      .then(r => r.json())
      .then(message => newState.messages = message)
      .then(fetch("http://localhost:5002/users")
      .then(r => r.json()))
      .then(user => newState.users = user)
      .then(() => this.setState(newState))
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
    return APIManager.newsPut("news",editedArticle,id )
      .then(() => APIManager.getAll("news"))
      .then(news =>
        this.setState({
          news: news
        })
      );
  };
// NEWS FUNCTIONS END
  //  EVENTS FUNCTIONS BEGIN
        addEvent = event => {
            return APIManager.post("events", event)
              .then(() => APIManager.getAll("events"))
              .then(events =>
                this.setState({
                  events: events
                })
              );
        }
        deleteEvent = id => {
          return APIManager.delete("events", id)
            .then(() => APIManager.getAll("events"))
            .then(events => {
              // this.props.history.push("/events");
              this.setState({ events: events });
            });
        };
        editEvent = (editedEventObject) => {
          return APIManager.put("events", editedEventObject)
            .then(() => APIManager.getAll("events"))
            .then(events => {

              this.setState({ events: events });
            });
        };

// EVENT FUNCTIONS END

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
           path="/register" render={props => {
            return <Register/>
            // Remove null and return the component which will show news articles
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

        {/* <Route
          path="/messages" render={props => {
            return <Messages messages={this.state.messages}
                  users={this.state.users}/>
          }}
        /> */}

        <Route
          path="/tasks" render={props => {
            return null
          }}
        />
        <Route
          exact path="/events" render={props => {
            return <Events {...props} deleteEvent={this.deleteEvent} events={this.state.events}/>
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          exact path="/events/eventsform" render={props => {
            return <EventsForm {...props} addEvent={this.addEvent} />
            // Remove null and return the component which will show the user's tasks
          }}
        />
        <Route
          exact path="/events/:eventId(\d+)/edit" render={props => {
            return <EditForm {...props} editEvent={this.editEvent} events={this.state.events} />
            // Remove null and return the component which will show the user's tasks
          }}
        />

        <Route path="/login" component={Login} />

      </React.Fragment>
    );
  }
}

