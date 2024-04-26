const passwordInput = document.querySelector("input");
const visibilityBtn = document.querySelector("button");

visibilityBtn.addEventListener("click", function () {
  // Check if the input field is not empty
  if (passwordInput.value !== "") {
    // types r many, so toggle would switch between has type/has no type
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      visibilityBtn.textContent = "👁️ Hide Password 👁️";
    } else {
      passwordInput.type = "password";
      visibilityBtn.textContent = "👁️ Show Password 👁️";
    }
  }
  visibilityBtn.classList.toggle("leButton--hide");
});
