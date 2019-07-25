import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import APIManager from '../../modules/APIManager';


class Login extends Component {

    state = {
        username: "",
        password: "",
        id: ""
    }


    handleFieldChange = (evt) => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    handleLogin = (e) => {
        e.preventDefault()

        APIManager.getAll("users").then(user => {
            const singleUser = user.find(
                el => el.username.toLowerCase() === this.state.username.toLowerCase() && el.password.toLowerCase() === this.state.password.toLowerCase()
            )
            if (singleUser) {
                sessionStorage.setItem("credentials", singleUser.id)
            }
            this.props.history.push('/news')
        })
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

export default withRouter(Login)