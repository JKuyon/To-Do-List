import { v4 as uuidV4 } from "uuid"; // Unique Identifier

// Create custom type for Task Object
type Task = {
  id: string,
  title: string,
  completed: boolean,
  createdAt: Date
}

// Select DOM Elements using types
const list = document.querySelector<HTMLUListElement>("#list");
const form = document.getElementById("new-task-form") as HTMLFormElement | null;
const input = document.querySelector<HTMLInputElement>("#new-task-title");

// Create Array of Tasks
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// Optional Chaining
form?.addEventListener("submit", Event => {
  Event.preventDefault(); // Prevent Default Submission

  // Return nothing of input value is empty
  if (input?.value == "" || input?.value == null) return;

  // New Task Object
  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date()
  }

  tasks.push(newTask); // Add new task to array
  saveTasks(); // Save Task for Local Storage

  // Add new task object to DOM
  addListItem(newTask);
  input.value = ""; // Reset Input
})

// Function to add new item in List
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  // Save Task if checkbox is checked
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  })

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;
  label.append(checkbox, task.title); // Insert Checkbox to DOM
  item.append(label); // Insert Label to DOM
  list?.append(item); // Insert new task in List to DOM
}

// Set local storage for Tasks in List
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

// Load Tasks on reload
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}