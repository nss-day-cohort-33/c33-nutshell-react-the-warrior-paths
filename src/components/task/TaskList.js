import React, { Component } from 'react';
// import "./task.css"
import APIManager from "../../modules/APIManager"
// import { Link } from "react-router-dom";

class TaskList extends Component {

    render() {
        console.log(this.props.tasks)
        return (
            <React.Fragment>
                <section className="tasks container" >
                    <h1>Task List</h1>
                    <button type="button"
                        onClick={() => this.props.history.push("/tasks/new")}
                        className="btn btn-success">
                        Add Task
                    </button>
                    {this.props.tasks.filter(task => task.userId === Number(sessionStorage.getItem("credentials")) && task.completionStatus !== true)
                        .map(task =>

                            <div key={task.id} className="task container">
                                {task.taskName} <br />
                                {task.completionDate} <br />
                                Completed: {
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
                                <a href="#"
                                    onClick={() => this.props.deleteTask(task.id)}
                                    className="card-link">Delete</a>
                            </div>

                        )
                    }
                </section>
            </React.Fragment>
        )
    }
}



export default TaskList