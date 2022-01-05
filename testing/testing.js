const containers = document.querySelectorAll('.container')
const tasks = document.querySelectorAll('.task')

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
        if (afterElement == null){
            container.appendChild(dragable)
        } else {
            container.insertBefore(dragable, afterElement)
        }
    })
})

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')] // [] turn in to array
    console.log(draggableElements)
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