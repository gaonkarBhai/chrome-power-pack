const addTask = document.getElementById("add-task");
const deleteTask = document.getElementById("delete-task");
const startBtn = document.getElementById("start-btn");
const stopBtn = document.getElementById("stop-btn");
const resetBtn = document.getElementById("reset-btn");

startBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: true });
})
stopBtn.addEventListener("click", () => {
  chrome.storage.local.set({ isRunning: false });
})
resetBtn.addEventListener("click", () => {
  chrome.storage.local.set({ timer: 0,isRunning:false });
})


let taskArr = [];

chrome.storage.sync.get(["tasks"], (res) => {
  taskArr = res.tasks ? res.tasks : [];
  renderTasks();
});

function saveTask() {
  chrome.storage.sync.set({ tasks: taskArr });
}

const renderTask = (taskNum) => {
  const taskRow = document.createElement("div");
  // input text
  const taskInput = document.createElement("input");
  taskInput.type = "text";
  taskInput.placeholder = "Enter a task...";
  taskInput.value = taskArr[taskNum];

  taskInput.addEventListener("change", () => {
    taskArr[taskNum] = taskInput.value;
    saveTask();
  });

  // delete btn
  const deleteBtn = document.createElement("input");
  deleteBtn.type = "button";
  deleteBtn.value = "X";
  deleteBtn.addEventListener("click", () => {
    deleteTasks(taskNum);
  });

  taskRow.appendChild(taskInput);
  taskRow.appendChild(deleteBtn);
  const taskContainer = document.getElementById("task-container");
  taskContainer.appendChild(taskRow);
};

const addTasks = () => {
  const taskNum = taskArr.length;
  taskArr.push("");
  renderTask(taskNum);
  saveTask();
};

const deleteTasks = (taskNum) => {
  taskArr.splice(taskNum, 1);
  renderTasks();
  saveTask();
};

const renderTasks = () => {
  const taskContainer = document.getElementById("task-container");
  taskContainer.textContent = "";
  taskArr.forEach((taskText, taskNum) => {
    renderTask(taskNum);
  });
};

addTask.addEventListener("click", addTasks);
deleteTask.addEventListener("click", deleteTasks);
