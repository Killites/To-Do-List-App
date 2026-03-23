let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

// Render tasks
function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {

    if (
      (currentFilter === "completed" && !task.completed) ||
      (currentFilter === "pending" && task.completed)
    ) {
      return;
    }

    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
      li.classList.add("completed");
    }

    // Toggle complete
    li.onclick = () => {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
    };

    // Delete button with animation
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.onclick = (e) => {
      e.stopPropagation();

      li.style.transform = "translateX(100px)";
      li.style.opacity = "0";

      setTimeout(() => {
        tasks.splice(index, 1);
        saveTasks();
      }, 300);
    };

    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Add task
function addTask() {
  const input = document.getElementById("taskInput");
  const value = input.value.trim();

  if (value === "") return;

  tasks.push({
    text: value,
    completed: false
  });

  input.value = "";
  saveTasks();
}

// Save + re-render
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// Filter
function filterTasks(type) {
  currentFilter = type;

  document.getElementById("allBtn").classList.remove("active");
  document.getElementById("completedBtn").classList.remove("active");
  document.getElementById("pendingBtn").classList.remove("active");

  if (type === "all") {
    document.getElementById("allBtn").classList.add("active");
  } else if (type === "completed") {
    document.getElementById("completedBtn").classList.add("active");
  } else {
    document.getElementById("pendingBtn").classList.add("active");
  }

  renderTasks();
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    localStorage.setItem("theme", "dark");
  } else {
    localStorage.setItem("theme", "light");
  }
}

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
}

// Default active filter
document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("allBtn").classList.add("active");
  renderTasks();
});