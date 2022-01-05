// This page provides the dynamic functionality for the scrumboard
const containers = document.querySelectorAll('.task-list')
var tasks = [...document.querySelectorAll('.added-task')]
// event listeners
document.addEventListener("click", addTask);
document.addEventListener("click", del);

// Button functions
function addTask(e){
    // function to add a task to task list
    const item = e.target;

    if (item.id === "enter"){
        var node = document.getElementById("new-task")
        var task = document.getElementById("taskEntry").value;

        // Create element1 to be added
        var add = document.createElement('div')
        add.className = "added-task"  
        add.innerHTML = "" + task + " <button class='delete'>delete</button>"
        add.draggable = "true"
        // Delete text input 
        document.getElementById('taskEntry').value = "";

        // Add the new HTML element
        tasks[tasks.length] = add;
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
tasks.forEach(task => {
    task.addEventListener('dragstart', () => {
        task.classList.add('dragging')
    })

    task.addEventListener('dragend', () => {
        task.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        
        const dragable = document.querySelector(".dragging")
        console.log(dragable)
        if (afterElement == null){
            container.appendChild(dragable)
        } else {
            container.insertBefore(dragable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.added-task:not(.dragging)')] // [] turn in to array
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height/2
        if (offset < 0 && offset > closest.offset){
            return {offset: offset, element:child}
        }else {
            return closest
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element
}