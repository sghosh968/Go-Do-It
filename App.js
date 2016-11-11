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
    this.addTasK = this.addTasK.bind(this);
  }
  addTasK(newTaskData) {
    this.setState({
      tasks: this.state.tasks.push({
        id: this.state.tasks.length + 1,
        title: newTaskData.title,
        status: "Incomplete",
        deadline: newTaskData.deadline
      })
    })
  }
  render() {
    return(
      <div>
        <TasksTable tasksList={this.state.tasks}  />
        <NewTaskForm onAddTask={this.addTasK} />
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

// Task Form
class NewTaskForm extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
      <div>
        <form onSubmit="this.props.onAddTask()">
          <div>
            <label>Title</label>&nbsp;&nbsp;
            <input type='text' required />
          </div>
          <div>
            <label>To be done by</label>&nbsp;&nbsp;
            <input type="datetime-local" required />
          </div>
          <div>
            <button type="submit">Add task</button>
          </div>
        </form>
      </div>
    )
  }
}


// exporting App component
export default App;
