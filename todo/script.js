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

  // When a radio button (down below) is selected, the state.filter is updated to the selected value ('All', 'Done', or 'Open'), render the filtered
  //Method filter() needs a callback function to execute for each element in the array.
  // this callback fn should return a truthy value to keep the element in the resulting array
  const filteredTodos = state.todos.filter((notes) => {
    if (state.filter === "All") return true;
    if (state.filter === "Done") return notes.done;
    if (state.filter === "Open") return !notes.done;
  });

  filteredTodos.forEach((note) => {
    const li = document.createElement("li");

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.checked = note.done;
    //Ensuring that each checkbox has a unique id, which is important for accessibility, as well as for label element`s for attribute
    checkBox.id = `checkbox-${note.id}`;

    const label = document.createElement("label");
    label.htmlFor = checkBox.id;
    label.textContent = note.description;

    li.appendChild(checkBox);
    li.appendChild(label);
    toDoList.appendChild(li);

    checkBox.addEventListener("change", () => {
      note.done = !note.done;
      saveTodosToLocalStorage();
      render(); // Re-render to reflect changes
    });
  });
}

// Save the current state to LocalStorage
function saveTodosToLocalStorage() {
  localStorage.setItem("currentTodos", JSON.stringify(state.todos));
}

// Load the state from LocalStorage =
//get JSON string of to-dos stored in local storage under the key "currentTodos"
//Check if there is any saved data
//If there is saved data, parse the JSON string back into an array of to-do objects and assign it to state.todos
function loadTodosFromLocalStorage() {
  const savedTodos = localStorage.getItem("currentTodos");
  if (savedTodos) {
    state.todos = JSON.parse(savedTodos);
  }
}
// Prevent reload
document.getElementById("todoForm").addEventListener("submit", (event) => {
  event.preventDefault();

  // Filter duplicates
  const inputField = inputFieldEl.value.trim();

  // search the state.todos array for an element where the description property matches the value of inputField
  const found = state.todos.find(
    (element) => element.description === inputField
  );
  console.log(found);

  //The find method returns the first matching element, or undefined if no match is found
  // empty or undefined: return and not add the new to-do item. else found !== undefined will then be true
  if (inputField == "" || found !== undefined) return;

  //If the input field is not empty and no duplicate is found, add new to-do item
  state.todos.push({
    description: inputField,
    done: false,
    id: Math.random() * Date.now(),
  });

  // update state and the displayed to-do list on the web page based on the current state
  saveTodosToLocalStorage();
  render();

  //clear the input field where the user types a new to-do item, so it does not need to be cleared manually
  inputFieldEl.value = "";
});

doneBtn.addEventListener("click", (event) => {
  event.preventDefault(); // Prevent form submission

  // Filter out the completed todos
  state.todos = state.todos.filter((notes) => !notes.done);
  saveTodosToLocalStorage();
  render();
});

// Add event listeners to radio buttons for filtering (All, Done, Open radio)
document.querySelectorAll('input[name="tasks"]').forEach((radio) => {
  radio.addEventListener("change", (event) => {
    state.filter = event.target.value;
    render();
  });
});

loadTodosFromLocalStorage();
render();
