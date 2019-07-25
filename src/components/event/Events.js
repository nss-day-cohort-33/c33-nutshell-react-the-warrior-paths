import React, { Component } from 'react'
import EventsForm from './eventsForm';
import EventCard from "./EventCard"
import { Link } from "react-router-dom"

export default class Events extends Component {
    render() {
        return (
            <div>
                <button type = "button" onClick = {() => this.props.history.push("/events/eventsform")}>Create Event</button>
                
                {
                    this.props.events
                .map(event => <EventCard key={event.id} event={event} {...this.props} />)
                
                }
            </div>
            // <div>

            // </div>
        )
    }
}
