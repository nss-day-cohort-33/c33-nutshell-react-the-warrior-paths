import React, { Component } from 'react'

export default class MessageCard extends Component {
    render() {
        return (
            <div key={this.props.message.id} className="card">
                <div className="card-body">
                    <div className="card-title">
                        <h5>{this.props.message.user_id}</h5>
                        <p>{this.props.message.message}</p>
                    </div>
                </div>
            </div>
        )
    }
}
