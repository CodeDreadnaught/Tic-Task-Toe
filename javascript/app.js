const card = document.querySelector(".card");
const modeChanger = document.querySelector(".change-mode-parent");
const taskListParent = document.querySelector("ul.task-list-items");
const clearButton = document.querySelector(".clear-button");
const inputTask = document.querySelector("#input-task");
const filterTask = document.querySelector("#filter-task");
const taskSection = document.querySelector(".task-section");
const heading = document.querySelector(".tasks-head");
const miniHeading = document.querySelector(".task-section-head");
const tCollection = document.querySelectorAll(".task-collection");
const modeIcon = document.querySelector(".change-mode");
const logo = document.querySelector(".logo");
const footer = document.querySelector("footer");

function darkMode() {
    document.body.classList.toggle("dark");
    logo.classList.toggle("dark");
    heading.classList.toggle("dark");
    miniHeading.classList.toggle("dark");
    modeChanger.classList.toggle("dark");
    clearButton.classList.toggle("dark");
    modeIcon.classList.toggle("dark");
    footer.classList.toggle("dark");
    (Array.from(taskListParent.children)).forEach((current) => {
        current.classList.toggle("dark");
    });
    for (let i =0; i < tCollection.length; i++) {
        tCollection[i].classList.toggle("dark");
    }

    if (localStorage.getItem("appMode") == null) {
        localStorage.setItem("appMode", JSON.stringify(document.body.className));
    } else {
        localStorage.setItem("appMode", JSON.stringify(document.body.className));
    }
}
function addTask(e) {
    e.preventDefault();
    const taskListItem = document.createElement("li");
    const cancelButton = document.createElement("span");
    const listItem = document.createTextNode(inputTask.value);

    taskListItem.appendChild(listItem);

    cancelButton.innerText = "x";

    taskListItem.className = "list-item";
    cancelButton.className = "cancel-button";

    if (document.body.classList.contains("dark") === true) {
        taskListItem.classList.add("dark");
    } else {
        taskListItem.classList.remove("dark");
    }
    if (inputTask.value !== "") {
        taskListItem.appendChild(cancelButton);
        taskListParent.appendChild(taskListItem);
        addTaskToLocalStorage(inputTask.value);
    }

    inputTask.value = "";
    filterTask.value = "";
}
function deleteTask(e) {
    if (e.target.parentElement.classList.contains("list-item")) {
        e.target.parentElement.remove();
        deleteTaskFromLocalStorage(e.target.parentElement);
    }
}
function clearTasks() {
    while (taskListParent.firstChild) {
        taskListParent.removeChild(taskListParent.firstChild);
        localStorage.clear();
    }
}
function filterAllTask(e) {
    const inputedSearch = e.target.value.toLowerCase();

    (Array.from(taskListParent.children)).forEach((current) => {
        const storedTasks = (current.firstChild.textContent).toLowerCase();

        if (storedTasks.indexOf(inputedSearch) !== -1) {
            current.style.display = "flex";
        } else {
            current.style.display = "none";
        }
    });
}
function emptyListPreventer() {
    if (inputTask.value[0] === " ") {
        inputTask.value = "";
    }
}
function addTaskToLocalStorage(task) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function getTasksFromLocalStorage() {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((current) => {
        const taskListItem = document.createElement("li");
        const cancelButton = document.createElement("span");
        const listItem = document.createTextNode(current);

        taskListItem.appendChild(listItem);

        cancelButton.innerText = "x";

        taskListItem.className = "list-item";
        cancelButton.className = "cancel-button";

        if (current !== "") {
            taskListItem.appendChild(cancelButton);
            taskListParent.appendChild(taskListItem);
        }
    });

    document.body.classList.add(JSON.parse(localStorage.getItem("appMode")));
    logo.classList.add(JSON.parse(localStorage.getItem("appMode")));
    heading.classList.add(JSON.parse(localStorage.getItem("appMode")));
    miniHeading.classList.add(JSON.parse(localStorage.getItem("appMode")));
    modeChanger.classList.add(JSON.parse(localStorage.getItem("appMode")));
    clearButton.classList.add(JSON.parse(localStorage.getItem("appMode")));
    modeIcon.classList.add(JSON.parse(localStorage.getItem("appMode")));
    footer.classList.add(JSON.parse(localStorage.getItem("appMode")));
    (Array.from(taskListParent.children)).forEach((current) => {
        current.classList.add(JSON.parse(localStorage.getItem("appMode")));
    });
    for (let i =0; i < tCollection.length; i++) {
        tCollection[i].classList.add(JSON.parse(localStorage.getItem("appMode")));
    }
}
function deleteTaskFromLocalStorage(taskToBeDeleted) {
    let tasks;
    if (localStorage.getItem("tasks") === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }
    tasks.forEach((current, index) => {
        if (taskToBeDeleted.firstChild.textContent === current) {
            tasks.splice(index, 1);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
(function loadEventListners() {
    modeChanger.addEventListener("click", darkMode);
    card.addEventListener("submit", addTask);
    taskSection.addEventListener("click", deleteTask);
    clearButton.addEventListener("click", clearTasks);
    filterTask.addEventListener("keyup", filterAllTask);
    inputTask.addEventListener("keyup", emptyListPreventer);
    document.addEventListener("DOMContentLoaded", getTasksFromLocalStorage);
}) ();

