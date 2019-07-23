import React, { Component } from 'react'

export default class Login extends Component {
    // Set initial state
    state = {
        username: "",
        password: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = (event) => {
        const stateToChange = {}
        stateToChange[event.target.id] = event.target.value
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
                email: this.state.username,
                password: this.state.password
            })
        )
        this.props.history.push("/")
    }




    render() {
        return (
            <div>
             <label>Username</label>
             <input type="text"></input>
             <label>Password</label>
             <input type="password"></input>
             <button>login</button>
            </div>
        )
    }
}

// export default withRouter(Login)