const toggleButton = document.querySelector("button");

toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("dark");
  toggleButton.classList.toggle("light");
  if (toggleButton.classList.contains("dark")) {
    document.title = "Laku noć!";
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = "black";
    toggleButton.style.borderColor = "white";
  } else {
    document.title = "Good morning!";
    document.body.style.transition = "background-color 0.5s ease";
    document.body.style.backgroundColor = "white";
    toggleButton.style.borderColor = "black";
  }
});
