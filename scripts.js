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
    quantityInput.value.trim() !== "" &&
    minRangeInput.value.trim() !== "" &&
    maxRangeInput.value.trim() !== "";

  let isMinLessThanMax = minRangeInput.value < maxRangeInput.value;

  let isQuantityValid =
    parseInt(quantityInput.value) > 0 && parseInt(quantityInput.value) <= 1000;

  let isQuantityBiggerThanRange =
    parseInt(quantityInput.value) >
      parseInt(maxRangeInput.value) - parseInt(minRangeInput.value) + 1 &&
    checkboxRepeatInput.checked;

  console.log(
    `All inputs filled: ${allInputsFilled}, 
    Min < Max: ${isMinLessThanMax},
    Quantity valid: ${isQuantityValid}, 
    Quantity bigger than range: ${isQuantityBiggerThanRange}`
  );

  if (
    allInputsFilled &&
    isMinLessThanMax &&
    isQuantityValid &&
    isQuantityBiggerThanRange
  ) {
    alert("Por favor, preencha todos os campos corretamente.");
    return;
  }
  sortWrapper.classList.add("d-none");
  resultsWrapper.classList.remove("d-none");

  sortNumbers(
    quantityInput.value,
    minRangeInput.value,
    maxRangeInput.value,
    checkboxRepeatInput.checked
  );
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

function sortNumbers(quantity, min, max, notAllowRepeats) {
  const results = [];
  const usedNumbers = [];

  console.log(
    `Sorting ${quantity} numbers between ${min} and ${max}, do not allow repeats: ${notAllowRepeats}`
  );

  for (i = 0; i < quantity; i++) {
    // Generate a random number within the specified range
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    // If repeats are not allowed, check if the number has already been used
    if (notAllowRepeats) {
      while (usedNumbers.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      }
      usedNumbers.push(randomNumber);
    }
    results.push(randomNumber);
  }

  console.log("Generated numbers:", results);
  return results;
}
