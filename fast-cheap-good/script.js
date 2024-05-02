const wrapper = document.querySelector("#checkboxes-wrapper"); // <form>
let count = 0;
let previousChecked;

wrapper.addEventListener("change", function (event) {
  const currentCheckbox = event.target;

  if (currentCheckbox.checked) {
    count++;
  } else {
    count--;
  }

  if (count === 3) {
    previousChecked.checked = false;
    count--;
  }

  previousChecked = currentCheckbox;
});
