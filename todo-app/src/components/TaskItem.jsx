import React from "react";

import { useState } from "react";

function TaskItem ({tasks, handleCheckboxChange, setTasks}) {
    const [editTask, setEditTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedAssignedTo, setEditedAssignedTo] = useState("");

    function handleEdit(task) {
        setEditTask(task);
        setEditedTitle(task.title);
        setEditedAssignedTo(task.taskAssignedTo);
    }

    function saveEditedTask() {
        setTasks(tasks.map(task =>
            task.id === editTask.id ? { ...task, title: editedTitle, taskAssignedTo: editedAssignedTo } : task
        ));
        setEditTask(null);
    }
    
function handleDelete(id) {
    setTasks(tasks.filter(task => task.id !== id));
}

    return (
        <div className='task'>
        {tasks.map((task) => (
            <div className='task-container' key={task.id} style={{ backgroundColor: task.completed ? '#A6FF96 ' : '#F8FF95', color: '#353535', padding: "20px", borderRadius: "10px" }}>
                {editTask === task ? (
                    <div id="save">
                        <input type="text" placeholder="Enter new Task" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} style={{border: "none", borderRadius: "10px", padding: " 10px", marginTop: "10px", marginLeft:"10px"}} />
                        <input type="text" placeholder="Enter new Assigne" value={editedAssignedTo} onChange={(e) => setEditedAssignedTo(e.target.value)} style={{border: "none", borderRadius: "10px", padding: " 10px", marginTop: "10px", marginLeft:"10px"}} />
                        <button onClick={saveEditedTask} style={{backgroundColor: "#65B741", color: "white", border: "none", borderRadius: "10px", padding: " 10px", marginTop: "10px", marginLeft:"10px"}}>Save</button>
                    </div>
                ) : (
                    <div>
                        <h2><span style={{color: "#DC84F3"}}>Task: </span>{task.title}</h2>
                        <h2><span style={{color: "#DC84F3"}}>Assigned to : </span>{task.taskAssignedTo}</h2>
                        <h2><span style={{color: "#DC84F3"}}>Completion Status :</span> <input type="checkbox" checked={task.completed} onChange={() => handleCheckboxChange(task.id)} /></h2>
                        <div className='button'>
                            <button  id="edit" onClick={() => handleEdit(task)}>Edit</button>
                            <button id="delete" onClick={() => handleDelete(task.id)}>Delete</button>
                        </div>
                    </div>
                )}
            </div>
        ))}
    </div>
    )
}

export default TaskItem;