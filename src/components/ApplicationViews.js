import { Route, Redirect } from "react-router-dom";
import React, { Component } from "react";
import Welcome from "./authentication/Welcome"
import Login from "./authentication/Login"
import Register from "./authentication/Register"
import News from "./news/News"
import EventsForm from "./event/eventsForm"
import Events from "./event/Events"
import APIManager from "../modules/APIManager"
import EditForm from "./event/editForm";
import {withRouter} from "react-router"
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
           path="/register" render={props => {
            return <Register/>
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

        {/* <Route
          path="/messages" render={props => {
            return <Messages messages={this.state.messages} 
                  users={this.state.users}/>
          }}
        /> */}

        <Route
          path="/tasks" render={props => {
            return null
            // Remove null and return the component which will show the user's tasks
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

