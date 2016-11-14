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
      ],
      taskDataToForm: {}
    }
    this.addTask = this.addTask.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.setTaskDataForForm = this.setTaskDataForForm.bind(this);
  }
  addTask(newTaskData) {
    debugger
    // console.log("In method addTask");
    // console.log("newTaskData");
    // console.log(newTaskData);
    console.log("Before adding tasks :-");
    console.log(this.state.tasks);

    const newTasksCollection = this.state.tasks
    newTasksCollection.push({
      id: this.state.tasks.length + 1,
      title: newTaskData.title,
      status: "Incomplete",
      deadline: newTaskData.deadline
    })
    this.setState({
      tasks: newTasksCollection
    })
    console.log("After adding tasks :-");
    console.log(this.state.tasks);
  }

  updateTask(newTaskData) {
    const newTasksCollection = this.state.tasks
    const taskIndexInCollection = newTasksCollection.findIndex(task => task.id === newTaskData.id)
    const taskToBeUpdated =  newTasksCollection[taskIndexInCollection]
    taskToBeUpdated.title = newTaskData.title
    taskToBeUpdated.deadline = newTaskData.deadline
    newTasksCollection[taskIndexInCollection] = taskToBeUpdated
    this.setState({
      tasks: newTasksCollection
    })
  }

  deleteTask(newTaskData) {
    if (confirm('Are you sure?')) {
      const newTasksCollection = this.state.tasks
      const taskIndexInCollection = newTasksCollection.findIndex(task => task.id === newTaskData.id)
      newTasksCollection.splice(taskIndexInCollection, 1);
      this.setState({
        tasks: newTasksCollection
      })
    }
    else {
      return false;
    }
  }

  setTaskDataForForm(taskId) {
    console.log("In method setTaskDataForForm");
    console.log("Passed in taskId is :-");
    console.log(taskId);
    const taskData = this.state.tasks.find(task => task.id === taskId)
    this.setState({
      taskDataToForm: taskData
    })

  }
  render() {
    return(
      <div>
        <TasksTable tasksList={this.state.tasks} tasksTableTaskEditClickHandler={this.setTaskDataForForm}  tasksTableTaskDeleteClickHandler={this.deleteTask} />
        <NewTaskForm taskData={this.state.taskDataToForm} OnTaskFormSubmit={this.updateTask} formFor="Update" />
        <NewTaskForm OnTaskFormSubmit={this.addTask} formFor="New" />
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
    console.log("In render() for TasksTable component");

    let taskRows = this.props.tasksList.map(task => {
      return (
        <TaskRow key={task.id} taskData={task} taskRowTaskEditClickHandler={this.props.tasksTableTaskEditClickHandler} taskRowTaskDeleteClickHandler={this.props.tasksTableTaskDeleteClickHandler} />
      );
    })
    return(
      <table>
        <thead>
          <th>Serial no.</th>
          <th>Title</th>
          <th>Status</th>
          <th>Time left for deadline</th>
          <th></th>
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
  constructor(props) {
    super(props);
    this.taskEditClickHandler = this.taskEditClickHandler.bind(this);
  }
  taskEditClickHandler() {
    this.props.taskRowTaskEditClickHandler(this.props.taskData.id)
  }
  render() {
    return(
      <tr>
        <td>{this.props.taskData.id}</td>
        <td>{this.props.taskData.title}</td>
        <td>{this.props.taskData.status}</td>
        <td>
          <TaskTimer taskDeadline={this.props.taskData.deadline} />
        </td>
        <td>
          <button onClick={this.taskEditClickHandler}>Edit</button>&nbsp;&nbsp;
          <button onClick={() => this.props.taskRowTaskDeleteClickHandler(this.props.taskData)}>Delete</button>
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
    this.handleInputFieldChange = this.handleInputFieldChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.resetTaskForm = this.resetTaskForm.bind(this)
  }
  componentWillReceiveProps(newProps) {
    if(!!newProps.taskData){
      this.setState({
        newTask: newProps.taskData
      })
    }
  }

  componentWillMount() {
    if(!!this.props.taskData){
      this.state = {
        newTask: this.props.taskData
      }
    }
    else{
      this.state = {
        newTask: {title: "",
                  deadline: ""}
      }
    }
  }

  handleInputFieldChange(e) {
    const newTask = this.state.newTask;
    switch (e.target.name) {
    case "title":
      newTask.title = e.target.value;
      this.setState({
        newTask: newTask
      })
      break;
    case "deadline":
      newTask.deadline = e.target.value;
      this.setState({
        newTask: newTask
      })
      break;
    }
  }
  handleFormSubmit(e) {
    this.props.OnTaskFormSubmit(this.state.newTask);
    e.preventDefault();
    this.resetTaskForm()
  }
  resetTaskForm() {
    this.refs.taskForm.reset();
  }
  render() {
    return(
      <div>
      <h2>{this.props.formFor} Task</h2>
        <form ref="taskForm" onSubmit={this.handleFormSubmit} action="#">
          <div className="row uniform">
            <div className="6u 12u$(xsmall)">
              <input type='text' name="title" value={this.state.newTask.title} onChange={this.handleInputFieldChange} placeholder="Task Title" required />
            </div>
            <div className="6u 12u$(xsmall)">
              <input type="datetime-local" name="deadline"  value={this.state.newTask.deadline} onChange={this.handleInputFieldChange} required />
            </div>
            <div className="12u$">
              <ul className="actions">
                <li><input className="button small" type="submit" value={this.props.formFor === 'New' ? 'Add Task' : 'Update Task' } /></li>
                <li><input className="alt small" type="reset" value="Reset" /></li>
              </ul>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


// exporting App component
export default App;
