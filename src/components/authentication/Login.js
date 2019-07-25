import React, { Component } from 'react'
import {Link} from 'react-router-dom'

export default class Login extends Component {

    state = {
        username: "",
        password: ""
    }

    handleFieldChange = (evt) => {
        console.log(evt.target.id)
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    // Simplistic handler for login submit
    handleLogin = (e) => {
        e.preventDefault()

        /*
            For now, just store the email and password that
            the customer enters into local storage.
        */
        sessionStorage.setItem(
            "credentials",
            JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        )
        this.props.history.push("/news")
    }

    render() {
        return (
            <form onSubmit={this.handleLogin}>
                <label>Username:</label>
                <input onChange={this.handleFieldChange} type="text" id="username"></input>
                <label>Password:</label>
                <input onChange={this.handleFieldChange} type="password" id="password"></input>
                <button type="submit">Login</button>
            </form>
        )
    }
}

