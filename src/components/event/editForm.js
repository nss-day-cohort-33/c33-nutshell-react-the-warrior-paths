import React, { Component } from "react";
import APIManager from "../../modules/APIManager";
import { withRouter } from "react-router";

export default class EditForm extends Component {
  state = {
    id: "",
    userId: Number(sessionStorage.getItem("credentials")),
    title: "",
    date: "",
    location: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
    console.log(stateToChange);
  };

  editEvent = evt => {
    evt.preventDefault();
    const event = {
      userId: 1,
      title: this.state.title,
      date: this.state.date,
      location: this.state.location,
      id:this.props.match.params.eventId
    };

    this.props.editEvent(event).then(() => this.props.history.push("/events"));
  };

  componentDidMount() {
    APIManager.get("events", this.props.match.params.eventId).then(event => {
      this.setState({
        title: event.title,
        date: event.date,
        location: event.location
      });
    });
  }

  render() {
    return (
      <React.Fragment>
        <div>
          <form className="eventForm">
            <div className="form-group">
              <label htmlFor="eventName">Event Name</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="title"
                value={this.state.title}
              />
            </div>
            <div className="form-group">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="date"
                value={this.state.date}
              />
            </div>
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="location"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="location"
                value={this.state.location}
              />
            </div>

            <button
              type="submit"
              onClick={this.editEvent}
              className="btn btn-primary"
            >
              Edit Event
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}
