const toggleButton = document.querySelector("button");

toggleButton.addEventListener("click", function () {
  toggleButton.classList.toggle("dark");
  toggleButton.classList.toggle("light");
  if (toggleButton.classList.includes("dark")) {
    document.title = "Good night!";
    document.body.style.backgroundColor = black;
  }
});
