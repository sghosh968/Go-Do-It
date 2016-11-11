import React from 'react';
import ReactDOM from 'react-dom';

// Main App component
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      tasks: [
        {id: 1, title: "Task 1", status: "Incomplete", deadline: "24/11/2016"},
        {id: 2, title: "Task 2", status: "Complete", deadline: "13/11/2016"},
        {id: 3, title: "Task 3", status: "Incomplete", deadline: "12/11/2016"},
        {id: 4, title: "Task 4", status: "Incomplete", deadline: "20/11/2016"}
      ]
    }
  }
  render() {
    return(
      <div>
        <TasksTable tasksList={this.state.tasks} />
      </div>
    );
  }
}

// Task table component
class TasksTable extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    let taskRows = this.props.tasksList.map(task => {
      return (
        <TaskRow key={task.id} taskData={task} />
      );
    })
    return(
      <table>
        <thead>
          <th>Serial no.</th>
          <th>Title</th>
          <th>Status</th>
          <th>Time left for deadline</th>
        </thead>
        <tbody>
          {taskRows}
        </tbody>
      </table>
    )
  }
}

// Task row component
class TaskRow extends React.Component {
  render() {
    return(
      <tr>
        <td>{this.props.taskData.id}</td>
        <td>{this.props.taskData.title}</td>
        <td>{this.props.taskData.status}</td>
        <td>
          <TaskTimer taskDeadline={this.props.taskData.deadline} />
        </td>
      </tr>
    )
  }
}


// Task Timer component
class TaskTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft:  countdown( moment(this.props.taskDeadline, "DD-MM-YYYY HH:mm").toDate() ).toString()
    }
    this.updateTimeLeft = this.updateTimeLeft.bind(this)
    setInterval(this.updateTimeLeft, 1000)
  }
  updateTimeLeft() {
    this.setState({
      timeLeft: countdown( moment(this.props.taskDeadline, "DD-MM-YYYY HH:mm").toDate() ).toString()
    })
  }


  render() {
    return(
      <div>
        {this.state.timeLeft}
      </div>
    )
  }
}


// exporting App component
export default App;
