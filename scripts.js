// Inputs
const quantityInput = document.querySelector("#quantity");
const minRangeInput = document.querySelector("#min");
const maxRangeInput = document.querySelector("#max");
const checkboxRepeatInput = document.querySelector("#allow-repeats");

// Resetando os inputs no reload
quantityInput.value = "";
minRangeInput.value = "";
maxRangeInput.value = "";
checkboxRepeatInput.checked = false;

// Formatando os inputs
quantityInput.oninput = handleInputChange;
minRangeInput.oninput = handleInputChange;
maxRangeInput.oninput = handleInputChange;

// Sorting Wrappers
const sortWrapper = document.querySelector("#sort-form");
const resultsWrapper = document.querySelector("#result-tab");

// Buttons
const sortButton = document.querySelector(".submit-button .rainbow button");
const redoButton = document.querySelector(".redo-button .rainbow button");

// Lista de resultados
const resultList = document.querySelector(".results");

// Span que muda por iteração
const iterationTurn = document.querySelector(".title .overline");

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
    checkboxRepeatInput.checked; // se isso retornar true, significa que a quantidade é maior que o intervalo
  // se a quantidade for maior que o intervalo, não faz sentido permitir repetições

  switch (true) {
    case !allInputsFilled:
      alert("Por favor, preencha todos os campos.");
      return;
    case !isMinLessThanMax:
      alert("O valor mínimo deve ser menor que o valor máximo.");
      return;
    case !isQuantityValid:
      alert("A quantidade deve ser entre 1 e 1000.");
      return;
    case isQuantityBiggerThanRange:
      alert(
        "A quantidade não pode ser maior que o intervalo quando repetições não são permitidas."
      );
      return;
  }

  // If all validations pass, proceed with sorting
  results = sortNumbers(
    parseInt(quantityInput.value),
    parseInt(minRangeInput.value),
    parseInt(maxRangeInput.value),
    checkboxRepeatInput.checked
  );
  resultList.innerHTML = ""; // Clear previous results
  // swap screens
  sortWrapper.classList.add("d-none");
  resultsWrapper.classList.remove("d-none");
  // start adding sorting results
  results.forEach((result, index) => {
    setTimeout(() => {
      const resultItem = document.createElement("div");
      const resultText = document.createElement("span");

      resultItem.append(resultText);
      resultItem.classList.add("result-item", "background-animation");
      resultText.classList.add("text-animation");
      resultText.textContent = result;

      iterationTurn.textContent = `${index + 1}º RESULTADO`;
      resultList.appendChild(resultItem);
    }, index * 3000); // same time as the animation
  });
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

  for (let i = 0; i < quantity; i++) {
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (
      (notAllowRepeats && usedNumbers.includes(randomNumber)) ||
      randomNumber < min ||
      randomNumber > max
    );

    results.push(randomNumber);
    if (notAllowRepeats) {
      usedNumbers.push(randomNumber);
    }
  }

  return results;
}
