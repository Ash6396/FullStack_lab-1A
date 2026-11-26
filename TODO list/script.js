const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");

let tasks = [];

// Add a new task when the Add Task button is clicked.
addButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  tasks.push({ text: taskText, completed: false });
  taskInput.value = "";
  showTasks();
});

function showTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task, index) {
    const listItem = document.createElement("li");
    listItem.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const text = document.createElement("span");
    text.className = "task-text";
    text.textContent = task.text;

    if (task.completed) {
      text.classList.add("completed");
    }

    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      showTasks();
    });

    const upButton = document.createElement("button");
    upButton.textContent = "Up";
    upButton.addEventListener("click", function () {
      if (index > 0) {
        const previousTask = tasks[index - 1];
        tasks[index - 1] = tasks[index];
        tasks[index] = previousTask;
        showTasks();
      }
    });

    const downButton = document.createElement("button");
    downButton.textContent = "Down";
    downButton.addEventListener("click", function () {
      if (index < tasks.length - 1) {
        const nextTask = tasks[index + 1];
        tasks[index + 1] = tasks[index];
        tasks[index] = nextTask;
        showTasks();
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      tasks.splice(index, 1);
      showTasks();
    });

    listItem.append(checkbox, text, upButton, downButton, deleteButton);
    taskList.appendChild(listItem);
  });
}
