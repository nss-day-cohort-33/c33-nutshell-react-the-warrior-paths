import React, { Component } from 'react'


export default class EventsForm extends Component {

    state = {
        id: "",
        title: "",
        date: "",
        location: ""
      };

      handleFieldChange = (evt) => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
        console.log(stateToChange)
      };

      makeNewEvent = (evt) => {
        evt.preventDefault();
          const event = {
            userId: 1,
            title: this.state.title,
            date: this.state.date,
            location: this.state.location
          }
          
          this.props
          .addEvent(event)
          .then(() => this.props.history.push("/events"));
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
              placeholder="Event"
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
              placeholder="date"
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
              placeholder="location"
            />
          </div>
          
          
          <button
            type="submit"
            onClick={this.makeNewEvent}
            className="btn btn-primary"
          >
            Add Event
          </button>
        </form>
                
            </div>
      </React.Fragment>
        )
    }
}

