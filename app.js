class Task {
    constructor(name, description, endDate) {
        this.id = Math.floor(Math.random() * new Date().getTime());
        this.name = name;
        this.description = description;
        this.endDate = endDate;
        this.status = false;
    }
    getId() {
        return this.id
    }
    getName() {
        return this.name
    }
    getDesciption() {
        return this.description
    }
    getEndDate() {
        return this.endDate
    }
    getStatus() {
        if (this.status == false) return "Uncompleted";
        else return "Completed";
    }
    overdue() {
        if (new Date(this.endDate).getTime() < new Date().getTime())
            return "style= 'color:red'";
        if (this.status == true)
            return "style= 'color:green'";
    }
}
const tasks = [];

function createTask() {
    const taskAddName = document.getElementById('add-task-name').value;
    const taskAddDescription = document.getElementById('add-task-description').value;
    const taskAddEndDate = document.getElementById('add-task-endDate').value;
    const newTask = new Task(
        taskAddName,
        taskAddDescription,
        taskAddEndDate
    )
    if (/\d/.test(taskAddName) == true) {
        return alert("Name cannot contain numbers")
    }
    if (tasks.some(t => t.name == taskAddName)) {
        return alert("Task already exists")
    }
    if (!taskAddName) {
        return alert("Please enter task name")

    }
    if (!taskAddDescription) {
        return alert("Please enter task description")
    }
    if (!taskAddEndDate /* || new Date(taskAddEndDate).getTime() <= new Date().getTime() */ ) {
        return alert("Please enter a valid end date")
    } else {
        tasks.push(newTask);

        taskBox.style.display = "none";

    }
    handleTasks(tasks)
}

function handleTasks(data) {
    const container = document.getElementById('taskList');
    let html = '';
    data.forEach(t => {
        html += `
        <tr ${t.overdue()} style="display:flex">
        <td><h2>${t.getName()}</h2></td>
        <td><p>${t.getDesciption()}</p></td>
        <td><h3>${t.getEndDate()}</h3></td>
        <td>${t.getStatus()}</td></tr>
        <tr><td><button onClick=deleteTask(${t.getId()})>Delete</button></td>
        <td><button onClick=completeTask(${t.getId()})>Complete</button></td>
        <td><button id="updateBoxOpener" onClick=openUpdateTask(${t.getId()})>Update</button></td></tr>`;
    })
    container.innerHTML = html;
}

function deleteTask(id) {
    const index = tasks.findIndex(o => o.id === id)
    if (index !== -1) {
        tasks.splice(index, 1);
        handleTasks(tasks)
        return alert("Task id: " + id + " has been deleted");

    }
}

function updateTask(id) {
    const taskUpdateName = document.getElementById('update-task-name').value;
    const taskUpdateDescription = document.getElementById('update-task-description').value;
    const taskUpdateendDate = document.getElementById('update-task-endDate').value;

    const index = tasks.findIndex(o => o.id === id)
    taskUpdateName.placeholder = tasks[index].name;
    taskUpdateDescription.placeholder = tasks[index].description;
    console.log(tasks[index]);
    tasks[index].name = taskUpdateName;
    tasks[index].description = taskUpdateDescription;
    tasks[index].endDate = taskUpdateendDate;
    const updateTaskBox = document.getElementById('updateTaskBoxWrapper');
    updateTaskBox.style.display = "none";
    handleTasks(tasks)
}

function openUpdateTask(id) {

    const updateArea = document.getElementById('updateBtnArea');

    updateArea.innerHTML = `</label><br><button id="update-task-button" onClick=updateTask(${id})>Update Task</button> `;



    const updateTaskBox = document.getElementById('updateTaskBoxWrapper');
    updateTaskBox.style.display = "block";



    const index = tasks.findIndex(o => o.id === id);

    console.log(tasks[index]);

}

function closeUpdateBtn() {
    const updateTaskBox = document.getElementById('updateTaskBoxWrapper');
    updateTaskBox.style.display = "none";
}

function completeTask(id) {
    const index = tasks.findIndex(o => o.id === id)
    if (index !== -1) {
        tasks[index].status = true;
        handleTasks(tasks)
    }
}
document.getElementById('add-task-button').addEventListener('click', createTask);
handleTasks(tasks);
const openButton = document.getElementById('taskOpener');
const taskBox = document.getElementById('taskBoxWrapper');
openButton.addEventListener('click', () => {
    taskBox.style.display = 'block';
});
document.getElementById('close').addEventListener('click', () => {
    taskBox.style.display = "none";
})

function selectTask() {
    const taskSelector = document.getElementById('taskSelector').value;

    if (taskSelector == 'All') {
        handleTasks(tasks);
    }
    if (taskSelector == 'Completed') {
        const completedTasks = tasks.filter((t) => {
            return t.status == true;
        })
        handleTasks(completedTasks)
    }
    if (taskSelector == 'Uncompleted') {
        const uncompletedTasks = tasks.filter((t) => {
            return t.status == false;
        })
        handleTasks(uncompletedTasks)
    }
}
selectTask()