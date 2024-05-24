const inputFieldEl = document.querySelector("#inputField");
const btn = document.querySelector("button");
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
render();
