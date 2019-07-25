import React, { Component } from 'react'

export default class EventCard extends Component {
    render() {
        return (
            <section className="events">
        {
          
            <div key={this.props.event.id} className="card">
              <div className="card-body">
                <div className="card-title">
                  <p>Event: {this.props.event.title}</p>
                  <p>Date: {this.props.event.date}</p>
                  <p>Location: {this.props.event.location}</p>
                  <button type ="button"onClick={() => this.props.history.push(
                `/events/${this.props.event.id}/edit`)}>Edit</button>
                  <button type="button"onClick={() => this.props.deleteEvent(
                this.props.event.id)}
              className="card-link"
            >Delete</button>
                </div>
              </div>
            </div>
          
        }
      </section>
            
        )
    }
}

