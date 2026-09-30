// =====================================
// TASK DATA
// =====================================

let tasks = [
    {
        id: 1,
        title: "Practice arrays",
        priority: "High",
        completed: false
    },

    {
        id: 2,
        title: "Revise functions",
        priority: "Medium",
        completed: true
    }
];


// =====================================
// SELECT TASK HTML ELEMENTS
// =====================================

const taskListEl =
    document.querySelector("#taskList");

const taskCountEl =
    document.querySelector("#taskCount");

const taskForm =
    document.querySelector("#taskForm");

const taskInput =
    document.querySelector("#taskInput");

const taskPriority =
    document.querySelector("#taskPriority");

const taskSearch =
    document.querySelector("#taskSearch");


// =====================================
// ADD TASK
// =====================================

function addTask(event) {

    event.preventDefault();

    const title =
        taskInput.value.trim();

    if (title === "") {
        return;
    }

    const newTask = {

        id: Date.now(),

        title: title,

        priority: taskPriority.value,

        completed: false
    };

    tasks.push(newTask);

    showNotification("Task added successfully!");

    taskInput.value = "";

    renderTasks();
}


// =====================================
// TOGGLE TASK
// =====================================

function toggleTask(taskId) {

    const task =
        tasks.find(
            (task) =>
                task.id === taskId
        );

    if (task) {

        task.completed =
            !task.completed;
    }

    renderTasks();
}


// =====================================
// DELETE TASK
// =====================================

function deleteTask(taskId) {

    tasks =
        tasks.filter(
            (task) =>
                task.id !== taskId
        );

    renderTasks();
}


// =====================================
// SEARCH TASKS
// =====================================

function searchTasks() {

    const searchText =
        taskSearch.value
            .toLowerCase()
            .trim();

    const filteredTasks =
        tasks.filter((task) =>

            task.title
                .toLowerCase()
                .includes(searchText)
        );

    renderTasks(filteredTasks);
}


// =====================================
// TASK EVENT LISTENERS
// =====================================

taskForm.addEventListener(
    "submit",
    addTask
);

taskSearch.addEventListener(
    "input",
    searchTasks
);


// =====================================
// RENDER TASKS
// =====================================

export function renderTasks(taskArray = tasks) {

    taskListEl.innerHTML = "";

    taskArray.forEach((task) => {

        const item =
            document.createElement("div");

        const taskText =
            document.createElement("span");

        taskText.textContent =
            `${task.completed ? "✅" : "⬜"} ${task.title}`;


        const priority =
            document.createElement("small");

        priority.textContent =
            `Priority: ${task.priority}`;


        const completeButton =
            document.createElement("button");

        completeButton.textContent =
            "Complete";

        completeButton.addEventListener(
            "click",
            () => {
                toggleTask(task.id);
            }
        );


        const deleteButton =
            document.createElement("button");

        deleteButton.textContent =
            "Delete";

        deleteButton.addEventListener(
            "click",
            () => {
                deleteTask(task.id);
            }
        );


        item.appendChild(taskText);
        item.appendChild(priority);
        item.appendChild(completeButton);
        item.appendChild(deleteButton);

        taskListEl.appendChild(item);
    });


    taskCountEl.textContent =
        tasks.length;
}


// =====================================
// INITIAL RENDER
// =====================================

renderTasks();