// This page provides the dynamic functionality for the scrumboard
var containers = document.querySelectorAll('.task-list')
var tasks = document.getElementsByClassName('added-task')

// event listeners
document.addEventListener("click", addTask);
document.addEventListener("click", del);

// Button functions
function addTask(e){ // working
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
        node.appendChild(add)
        tasks = document.getElementsByClassName('added-task')
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
containers.forEach(container => {
    try {   
        container.addEventListener('dragover', e => {
            e.preventDefault()
            const afterElement = getDragAfterElement(container, e.clientY)
            const dragable = document.querySelector(".dragging")
            if (afterElement == null){
                container.appendChild(dragable)
            } else {
                container.insertBefore(dragable, afterElement)
            }
        }) 
    }catch{

    }  
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.added-task:not(.dragging)')]
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

document.addEventListener('dragstart', (e) => {
    item = e.target
    if (item.className === "added-task"){
        item.classList.add('dragging')
        
        item.addEventListener('dragend', (e) => {
            item.classList.remove('dragging')
        })
    } else {

    }
})

