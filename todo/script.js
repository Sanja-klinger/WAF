const inputFieldEl = document.querySelector("#inputField");
const btn = document.getElementById("btn");
const toDoList = document.querySelector("#todoList");
const doneBtn = document.getElementById("doneBtn");

/*Inside the curly braces{} that define an object literal, you define properties as key-value pairs.
todos: [] initializes a property named todos with an empty array as its value.
filter: 'All' initializes a property named filter with the string 'All' as its value.*/
const state = {
  todos: [],
  filter: "All",
};

function render() {
  // Clear the current list, so we don't have the previous list repeated
  toDoList.innerHTML = "";

  // Filter todos based on the current filter state: if 'all' return function, if done return done, if open return all NOT done
  const filteredTodos = state.todos.filter((notes) => {
    if (state.filter === "All") return true;
    if (state.filter === "Done") return notes.done;
    if (state.filter === "Open") return !notes.done;
  });

  filteredTodos.forEach((notes) => {
    const li = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = notes.done;
    //Ensuring that each checkbox has a unique id, which is important for accessibility, as well as for label element`s for attribute
    checkBox.id = `checkbox-${notes.id}`;

    const label = document.createElement("label");
    label.htmlFor = checkBox.id;
    label.textContent = notes.description;

    li.appendChild(checkBox);
    li.appendChild(label);
    toDoList.appendChild(li);

    checkBox.addEventListener("change", () => {
      notes.done = !notes.done;
      saveTodosToLocalStorage();
      render(); // Re-render to reflect changes
    });
  });
}

// Save the current state to LocalStorage
function saveTodosToLocalStorage() {
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
}

// Load the state from LocalStorage
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}

document.getElementById("todoForm").addEventListener("submit", (event) => {
  event.preventDefault(); // Prevent form submission
  // Filter duplicates
  const inputField = inputFieldEl.value.trim();
  const found = state.todos.find(
    (element) => element.description === inputField
  );
  console.log(found);

  if (inputField == "" || found !== undefined) return;

  state.todos.push({
    description: inputField,
    done: false,
    id: Math.random() * Date.now(),
  });

  saveTodosToLocalStorage();
  render();
  inputFieldEl.value = "";
});

doneBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission

  // Filter out the completed todos
  state.todos = state.todos.filter((notes) => !notes.done);
  saveTodosToLocalStorage();
  render();
});

// Add event listeners to radio buttons for filtering
document.querySelectorAll('input[name="tasks"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.filter = event.target.value;
    render();
  });
});

loadTodosFromLocalStorage();
render();
