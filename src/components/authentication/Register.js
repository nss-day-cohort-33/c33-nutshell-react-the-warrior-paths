import React, { Component } from 'react'

export default class Register extends Component {
    render() {
        return (
            <div>
                <label>Username:</label>
                <input type="text"></input>
                <label>Email:</label>
                <input type="text"></input>
                <label>Password:</label>
                <input type="password"></input>
                <button>Register</button>
            </div>
        )
    }
}
