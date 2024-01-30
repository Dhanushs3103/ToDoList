import { useState } from 'react';
import TaskItem from './components/TaskItem';
import './App.css'

function App() {
  const [formState, setFormState] = useState({
    title: "",
    taskAssignedTo: ""
  });

  const [tasks, setTasks] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    if (formState.title === "" || formState.taskAssignedTo === "") {
      alert("Please fill all the fields");
    } else {
      const newTask = {
        ...formState,
        id: Date.now(),
        completed: false // Added completed field
      };

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);

      setFormState({
        title: "",
        taskAssignedTo: "",
      });
    }
  }

  function handleChange(e) {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

    const newFormState = {
      ...formState,
      [e.target.name]: value,
    };
    setFormState(newFormState);
  }

  function handleCheckboxChange(id) {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        return {
          ...task,
          completed: !task.completed 
        };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  return (
    <>
    <h1>Todo App 📝</h1>
      <div className="App">
        <form onSubmit={handleSubmit} id='form'>
          <label htmlFor="title">
            Title : 
            <input name="title" type="text" placeholder="Write your task over here" onChange={handleChange} value={formState.title}/>
          </label>
          <label htmlFor="taskAssignedto">
            Assign to : 
            <select name="taskAssignedTo" onChange={handleChange} value={formState.taskAssignedTo}>
              <option value="">Select Assignee</option>
              <option value="Dhanush">Dhanush</option>
              <option value="Nikitha">Nikitha</option>
              <option value="Nikhil">Nikhil</option>
              <option value="Swetha">Swetha</option>
              <option value="Sumith">Sumith</option>
            </select>
          </label>
          <div className='button'> <button type="submit"  id='submit'>Add New Task</button></div>
        </form>

        <TaskItem tasks = {tasks} handleCheckboxChange = {handleCheckboxChange} setTasks = {setTasks}/>
      </div>
     
    </>
  );
}

export default App;
