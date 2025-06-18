// Inputs
const quantityInput = document.querySelector("#quantity");
const minRangeInput = document.querySelector("#min");
const maxRangeInput = document.querySelector("#max");
const checkboxRepeatInput = document.querySelector("#allow-repeats");

quantityInput.oninput = handleInputChange;
minRangeInput.oninput = handleInputChange;
maxRangeInput.oninput = handleInputChange;

// Sorting Wrappers
const sortWrapper = document.querySelector("#sort-form");
const resultsWrapper = document.querySelector("#result-tab");

// Buttons
const sortButton = document.querySelector(".submit-button .rainbow button");
const redoButton = document.querySelector(".redo-button .rainbow button");

sortButton.addEventListener("click", function (event) {
  event.preventDefault();
  let allInputsFilled =
    !quantityInput.value || !minRangeInput.value || !maxRangeInput.value;
  // Checar se tem mais coisas pra checar

  if (allInputsFilled) {
    alert("Por favor, preencha todos os campos.");
    return;
  }
  sortWrapper.classList.add("d-none");
  resultsWrapper.classList.remove("d-none");
});

redoButton.addEventListener("click", function (event) {
  event.preventDefault();
  quantityInput.value = "";
  minRangeInput.value = "";
  maxRangeInput.value = "";
  checkboxRepeatInput.checked = false;
  sortWrapper.classList.remove("d-none");
  resultsWrapper.classList.add("d-none");
});

// Functions
function handleInputChange(event) {
  let value = event.target.value.replace(/\D/g, "");
  if (value.length > 4) {
    value = value.slice(0, 4);
  }
  event.target.value = value;
}
