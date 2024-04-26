const hitit = document.querySelector("button");

hitit.addEventListener("click", function () {
  hitit.classList.toggle("light--dark");
  document.body.classList.toggle("body--dark");
  if (hitit.classList.contains("light--dark")) {
    document.title = "Laku noć!";
  }
});
