const inputFieldEl = document.querySelector("#inputField");

const btn = document.getElementById("btn");
const toDoList = document.querySelector("ul");

const state = {
  todos: [
    { description: "Learn JS", done: false, id: 1 },
    { description: "Learn CSS", done: true, id: 2 },
  ],
};

function render() {
  state.todos.forEach((notes) => {
    const li = document.createElement("li");
    li.textContent = notes.description;
    toDoList.appendChild(li);
  });
}
localStorage.getItem("currentTodos");
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}
render();

let currentId = 0;

btn.addEventListener("click", (event) => {
  const inputField = inputFieldEl.value.trim();
  /*if (inputField.value === "") {
    return;*/

  toDoList.innerHTML = "";
  event.preventDefault();
  state.todos.push({
    description: inputField,
    done: false,
    id: state.todos.length + 1,
  });
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
  render();

  inputFieldEl.value = "";
});
