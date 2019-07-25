import React, { Component } from 'react';
// import ApplicationViews from '../ApplicationViews';
import "./task.css"
// import APIManager from "../../modules/APIManager"
// import { Link } from "react-router-dom";
import clipboard from "./clipboards.svg"

export default class TaskList extends Component {

    render() {
        console.log(this.props.tasks)
        return (
            <React.Fragment>

                <section className="tasks container" >
                    <h1>Task List</h1>
                    </section>
                    <section className="main">
                    <button type="button"
                        onClick={() => this.props.history.push("/tasks/new")}
                        className="btn btn-info mainbutton">
                        Add Task
                    </button>
                    </section>

                    <div className="animals">
                    {/* <img src ={task} className="icon--task" alt="task"/> */}
                    {this.props.tasks.filter(task => task.userId === Number(sessionStorage.getItem("credentials")) && task.completionStatus !== true)
                        .map(task =>

                            <div key={task.id} className="card">
                              <div className="card-body">
                              <div className="card-title">
                              <img src ={clipboard} className="icon--task" alt="task"/>
                                {task.taskName} <br />
                                {task.completionDate} <br />
                               <b>Completed:</b> {
                                    task.completionStatus ? "completed" : "not yet"} <br />
                                <button
                                    type="button"
                                    className="btn btn-success"
                                    onClick={() => {
                                        this.props.history.push(`/tasks/${task.id}/edit`);

                                    }}
                                >
                                    Edit
                                </button> <br></br>

                                <button
                                    onClick={() => this.props.deleteTask(task.id)}
                                    className="btn btn-secondary card-link">Delete</button>
                            </div>
                            </div>
                    </div>
                        )
                    }

</div>


            </React.Fragment>
        )
    }
}

