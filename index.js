// This page provides the dynamic functionality for the scrumboard

// event listeners
document.addEventListener("click", addTask);
document.addEventListener("click", del);

tasksNumber = 0
// Button functions
function addTask(e){
    // function to add a task to task list
    const item = e.target;

    if (item.id === "enter"){
        var node = document.getElementById("task-list")
        var task = document.getElementById("taskEntry").value;
        tasksNumber += 1
        // Create element1 to be added
        var add = document.createElement('div')
        add.className = "added-task"  
        add.id = 'task'+tasksNumber
        add.innerHTML = "" + task + " <button class='delete'>delete</button>"

        // Delete text input 
        document.getElementById('taskEntry').value = "";

        // Add the new HTML element
        node.appendChild(add)
        e.preventDefault();
    }
}

function del(e){
    // function to delete task
    const item = e.target;

    // delete TODO
    if (item.classList[0] === "delete"){
        const todo = item.parentElement;
        todo.remove();
    }
}

/* drag functions */
