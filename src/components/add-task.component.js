import React, { Component } from "react";
import TaskDataService from "../services/task.service";

export default class AddTask extends Component {
  constructor(props) {
    super(props);
    this.onChangeTaskname = this.onChangeTaskname.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.newTask = this.newTask.bind(this);

    this.state = {
      id: null,
      taskname: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTaskname(e) {
    this.setState({
      taskname: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveTask() {
    var data = {
      taskName: this.state.taskname,
      taskDesc: this.state.description
    };

    TaskDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          taskname: response.data.taskname,
          description: response.data.description,
          status: response.data.status,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newTask() {
    this.setState({
      id: null,
      taskname: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newTask}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="taskname">Taskname</label>
              <input
                type="text"
                className="form-control"
                id="taskname"
                required
                value={this.state.taskname}
                onChange={this.onChangeTaskname}
                name="taskname"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveTask} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
