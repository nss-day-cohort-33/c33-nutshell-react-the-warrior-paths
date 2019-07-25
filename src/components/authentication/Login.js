import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import APIManager from '../../modules/APIManager';
<<<<<<< HEAD
// import {Link} from 'react-router-dom'

=======


>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
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
<<<<<<< HEAD
                sessionStorage.setItem("userId", singleUser.id)

            }
            this.props.history.push('/news')
=======
                sessionStorage.setItem("current_user", singleUser.id)
                this.props.history.push('/news')
            }
>>>>>>> 7ee6e68b3bf9062bd7b1f19b146730023327e2c0
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